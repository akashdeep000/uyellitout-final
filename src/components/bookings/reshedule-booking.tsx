"use client";

import { getNext30DaysAvailableDays, resheduleBooking } from "@/actions/booking";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { convertDateSlots, slotToTime } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Modify<T, K extends keyof T, R> = Omit<T, K> & { [P in K]: R };

export function ResheduleBooking({ children, id }: {
    children: React.ReactNode;
    id: string
}) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>();
    const [slots, setSlots] = useState<number[] | undefined>();

    const { toast } = useToast();

    const { data: availability, refetch: refetchAvailability } = useQuery({
        queryKey: ["availability"],
        queryFn: async () => {
            const data = await getNext30DaysAvailableDays();
            console.log({ data });

            return convertDateSlots(data, 0, -(new Date()).getTimezoneOffset());
        },
    });

    useEffect(() => {
        if (!date) return;
        console.log(availability?.find((day) => day.date.toLocaleDateString() === date.toLocaleDateString()));
        setSlots(availability?.find((day) => day.date.toLocaleDateString() === date.toLocaleDateString())?.slots);
    }, [availability, date]);

    const formSchema = z.object({
        date: z.date({
            required_error: "Date is required",
        }),
        startingSlot: z.coerce.number({
            message: "Time is required.",
        }),
    });
    type FormDataType = Modify<z.infer<typeof formSchema>, "startingSlot", string | undefined>

    const form = useForm<FormDataType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: undefined,
            startingSlot: undefined,
        }
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: resheduleBooking,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["upcoming-bookings"] });
            queryClient.invalidateQueries({ queryKey: ["not-scheduled-bookings"] });
            toast({
                title: "Booking rescheduled successfully",
            });
            form.reset();
            setOpen(false);
        },
        onError: (error) => {
            console.error("Error resheduling booking:", error);
            toast({
                title: "Failed to reshedule booking",
                description: error.message,
                variant: "destructive"
            });
        }
    });

    console.log({ availability });

    const handleReshedule = (data: FormDataType) => {
        mutation.mutate({
            id,
            date: convertDateSlots([{
                date: data.date!,
                slots: [Number(data.startingSlot!)]
            }], -(new Date()).getTimezoneOffset(), 0)[0].date,
            startingSlot: convertDateSlots([{
                date: data.date!,
                slots: [Number(data.startingSlot!)]
            }], -(new Date()).getTimezoneOffset(), 0)[0].slots[0],
        });
    };

    return (
        <Dialog open={open} onOpenChange={(open) => {
            setOpen(open);
            if (open) {
                refetchAvailability();
            }
        }}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reshedule the booking</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleReshedule)}>
                        <div className="space-y-6">
                            <FormField control={form.control} name="date" render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    {/* <FormLabel>Select a date</FormLabel> */}
                                    <FormControl className="grid place-items-center">
                                        <Calendar
                                            className="w-full"
                                            mode="single"
                                            selected={field.value} onSelect={(date) => {
                                                if (date) {
                                                    console.log("setting date", date);
                                                    const convertedDate = availability?.find((day) => day.date.toLocaleDateString() === date.toLocaleDateString())?.date;
                                                    console.log({ convertedDate });

                                                    if (convertedDate) {
                                                        form.setValue("date", convertedDate);
                                                        setDate(convertedDate);
                                                    }
                                                }
                                            }}
                                            initialFocus
                                            disabled={(date) => {
                                                const day = availability?.find((d) => new Date(d.date).toLocaleDateString() === date.toLocaleDateString());
                                                return !day || day?.slots.filter(slot => [slot + 1, slot + 2, slot + 3].every(slot => day.slots.includes(slot))).length === 0;
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="startingSlot" render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Time</FormLabel>
                                    <FormControl>
                                        <Select onOpenChange={open => {
                                            if (open) {
                                                refetchAvailability();
                                            }
                                        }} disabled={slots === undefined || slots?.length === 0} value={field.value} onValueChange={(value) => field.onChange(value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    slots?.filter(slot => [slot + 1, slot + 2, slot + 3].every(slot => slots.includes(slot))).sort((a, b) => a - b).map((slot) => (
                                                        <SelectItem key={slot} value={slot.toString()}>{slotToTime(slot)}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit" className="w-full" disabled={mutation.isPending}>
                                {mutation.isPending ? "Updating shedule..." : "Update shedule"}
                            </Button>
                        </div>
                    </form>
                </Form>
                {/* <pre>
                {JSON.stringify(availability, null, 2)}
            </pre> */}
            </DialogContent>
        </Dialog>
    );
}
