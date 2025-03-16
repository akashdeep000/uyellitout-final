"use client";

import { deleteAllBlockedSlotsAndAddNew, getAvailabilities, getBlockedSlots, updateAvailabilities } from "@/actions/booking";
import { AdminPageWrapper } from "@/components/admin/page-wraper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn, convertDateSlots, convertDaySlots } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, Eraser, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
    const { toast } = useToast();
    // const days =  ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const days: {
        key: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
        label: string;
    }[] = [{ key: "sun", label: "Sunday" }, { key: "mon", label: "Monday" }, { key: "tue", label: "Tuesday" }, { key: "wed", label: "Wednesday" }, { key: "thu", label: "Thursday" }, { key: "fri", label: "Friday" }, { key: "sat", label: "Saturday" }];
    const { data: availabilities, isLoading: availabilitiesLoading } = useQuery({
        queryKey: ["availabilities"],
        queryFn: async () => {
            const data = await getAvailabilities();
            return convertDaySlots(data, 0, -(new Date()).getTimezoneOffset());
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const { data: blockedAvailabilities, isLoading: blockedAvailabilitiesLoading } = useQuery({
        queryKey: ["blocked-availabilities"],
        queryFn: async () => {
            const data = await getBlockedSlots();
            return convertDateSlots(data, 0, -(new Date()).getTimezoneOffset());
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const [availableSlots, setAvailableSlots] = useState<{ day: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat", slots: number[] }[]>([]);
    const [blockedSlots, setBlockedSlots] = useState<{ date: Date | undefined, slots: number[] }[]>([]);

    useEffect(() => {
        if (availabilities) {
            setAvailableSlots(availabilities.map(a => ({ day: a.day, slots: a.slots })));
        }
    }, [availabilities]);
    useEffect(() => {
        if (blockedAvailabilities) {
            setBlockedSlots(blockedAvailabilities.map(a => ({ date: a.date, slots: a.slots })));
        }
    }, [blockedAvailabilities]);

    const queryClient = useQueryClient();

    const availableSlotsMutation = useMutation({
        mutationFn: async (data: {
            day: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
            slots: number[];
        }[]) => {
            await updateAvailabilities(convertDaySlots(data, -(new Date()).getTimezoneOffset(), 0));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["availabilities"] });
            toast({
                title: "Saved Weekly availabilities",
            });
        },
        onError: () => {
            toast({
                title: "Failed to save availabilities",
                variant: "destructive",
            });
        }
    });

    const blockedSlotsMutation = useMutation({
        mutationFn: async (data: {
            date: Date;
            slots: number[];
        }[]) => {
            await deleteAllBlockedSlotsAndAddNew(convertDateSlots(data, -(new Date()).getTimezoneOffset(), 0));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blocked-availabilities"] });
            toast({
                title: "Saved Blocked availabilities",
            });
        },
        onError: (error) => {
            toast({
                title: "Failed to save availabilities",
                description: error.message,
                variant: "destructive",
            });
        }
    });



    return (
        <AdminPageWrapper className="space-y-2" breadcrumb={[{ title: "Shedule" }]}>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-lg">Allowed Time Slots</h2>
                    <Button disabled={availableSlotsMutation.isPending} variant="outline" onClick={() => {
                        availableSlotsMutation.mutate(availableSlots);
                    }}>{availableSlotsMutation.isPending ? "Saving..." : "Save"}</Button>
                </div>
                <div>
                    {days.map(day => (
                        <div key={day.key}>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm">{`${day.label} (${(availableSlots.find(slot => slot.day === day.key)?.slots.length || 0) / 4} Hour)`}</p>
                                <Button onClick={() => {
                                    setAvailableSlots(availableSlots.map(a => a.day === day.key ? { ...a, slots: [] } : a));
                                }} variant="outline" size="icon"><Eraser /></Button>
                            </div>
                            {availabilitiesLoading ? <Skeleton className="h-[3.56rem] w-full my-2" /> :
                                <ScrollArea className="w-full py-2">
                                    <div className="flex w-max gap-1">
                                        {
                                            Array.from({ length: 24 }).map((_, hour) => (
                                                <div key={hour} className={`bg-white text-center border rounded ${[((hour * 4) + 0), ((hour * 4) + 1), ((hour * 4) + 2), ((hour * 4) + 3)].every(value => availableSlots.find(a => a.day === day.key)?.slots.includes(value)) ? "border-green-500" : ""}`}>
                                                    <div onClick={() => {
                                                        if (availableSlots.find(a => a.day === day.key)?.slots.includes((hour * 4)) && availableSlots.find(a => a.day === day.key)?.slots.includes((hour * 4) + 1) && availableSlots.find(a => a.day === day.key)?.slots.includes((hour * 4) + 2) && availableSlots.find(a => a.day === day.key)?.slots.includes((hour * 4) + 3)) {
                                                            setAvailableSlots(availableSlots.map(a => a.day === day.key ? { ...a, slots: a.slots.filter(s => ![((hour * 4) + 0), ((hour * 4) + 1), ((hour * 4) + 2), ((hour * 4) + 3)].includes(s)) } : a));
                                                        } else {
                                                            setAvailableSlots(availableSlots.map(a => a.day === day.key ? { ...a, slots: [...new Set([...a.slots, ((hour * 4) + 0), ((hour * 4) + 1), ((hour * 4) + 2), ((hour * 4) + 3)])] } : a));
                                                        }
                                                    }} className={`cursor-pointer rounded-t text-sm p-0.5 ${[((hour * 4) + 0), ((hour * 4) + 1), ((hour * 4) + 2), ((hour * 4) + 3)].every(value => availableSlots.find(a => a.day === day.key)?.slots.includes(value)) ? "bg-green-500 text-white" : "bg-muted-foreground/20 text-muted-foreground"}`}>{`${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"} - ${(hour + 1) % 12 || 12} ${(hour + 1) < 12 ? "AM" : "PM"}`}</div>
                                                    <div className="flex p-0.5 gap-0.5">
                                                        {Array.from({ length: 4 }).map((_, slot) => (
                                                            <div key={slot} onClick={() => {
                                                                if (availableSlots.find(a => a.day === day.key)?.slots.includes((hour * 4) + slot)) {
                                                                    setAvailableSlots(availableSlots.map(a => a.day === day.key ? { ...a, slots: a.slots.filter(s => s !== ((hour * 4) + slot)) } : a));
                                                                } else {
                                                                    setAvailableSlots(availableSlots.map(a => a.day === day.key ? { ...a, slots: [...a.slots, ((hour * 4) + slot)] } : a));
                                                                }
                                                            }} className={`cursor-pointer size-7 rounded ${availableSlots.find(a => a.day === day.key)?.slots.includes((hour * 4) + slot) ? "bg-green-500" : "bg-muted-foreground/10"}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            }
                        </div>
                    ))}
                </div>
                <div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <h2 className="font-semibold text-lg">Blocked Time Slots</h2>
                            <Button disabled={!!blockedSlots.find(slot => slot.date === undefined)} onClick={() => {
                                setBlockedSlots([...blockedSlots, { date: undefined, slots: [] }]);
                            }} variant="outline" size="icon"><Plus /></Button>
                            <Button disabled={blockedSlotsMutation.isPending} variant="outline" onClick={() => {
                                const filteredData = blockedSlots.filter(e => e.date) as {
                                    date: Date;
                                    slots: number[];
                                }[];
                                blockedSlotsMutation.mutate(filteredData);
                            }}>{blockedSlotsMutation.isPending ? "Saving..." : "Save"}</Button>
                        </div>

                        {blockedAvailabilitiesLoading && (
                            <>
                                <Skeleton className="mt-2 h-6 w-24" />
                                <Skeleton className="mb-2 h-[3.56rem] w-full" />
                            </>
                        )}

                        {blockedSlots?.map((day, index) => (
                            <div key={index}>
                                <div className="flex items-center gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[280px] justify-start text-left font-normal",
                                                    !day.date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {day.date ? `${format(day.date, "PPP")} (${(blockedSlots.find(slot => slot.date === day.date)?.slots.length || 0) / 4} Hour)` : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={day.date}
                                                onSelect={(date) => {
                                                    setBlockedSlots(blockedSlots.map((a, i) => i === index ? { ...a, date: date } : a));
                                                }}
                                                initialFocus
                                                disabled={(date) => {
                                                    const today = new Date();
                                                    today.setHours(0, 0, 0, 0);
                                                    const isPastDate = date < today;
                                                    const isBlockedDate = blockedSlots.some(block => block.date?.toDateString() === date.toDateString());
                                                    return isPastDate || isBlockedDate;
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <Button onClick={() => {
                                        setBlockedSlots(blockedSlots.map(a => a.date === day.date ? { ...a, slots: [] } : a));
                                    }} variant="outline" size="icon"><Eraser /></Button>
                                    <Button onClick={() => {
                                        setBlockedSlots(blockedSlots.filter(a => a.date !== day.date));
                                    }} variant="outline" size="icon"><Trash /></Button>
                                    <Button onClick={() => {
                                        setBlockedSlots(blockedSlots.map(a => a.date === day.date ? { ...a, slots: Array.from({ length: 96 }, (_, i) => i) } : a));
                                    }} variant="outline">All Day</Button>
                                </div>
                                <ScrollArea className="w-full py-2">
                                    <div className="flex w-max gap-1">
                                        {
                                            Array.from({ length: 24 }).map((_, hour) => (
                                                <div key={hour} className={`bg-white text-center border rounded ${[((hour * 4) + 0), ((hour * 4) + 1), ((hour * 4) + 2), ((hour * 4) + 3)].every(value => blockedSlots.find(a => a.date === day.date)?.slots.includes(value)) ? "border-red-500" : ""}`}>
                                                    <div onClick={() => {
                                                        if (blockedSlots.find(a => a.date === day.date)?.slots.includes((hour * 4)) && blockedSlots.find(a => a.date === day.date)?.slots.includes((hour * 4) + 1) && blockedSlots.find(a => a.date === day.date)?.slots.includes((hour * 4) + 2) && blockedSlots.find(a => a.date === day.date)?.slots.includes((hour * 4) + 3)) {
                                                            setBlockedSlots(blockedSlots.map(a => a.date === day.date ? { ...a, slots: a.slots.filter(s => ![((hour * 4) + 0), ((hour * 4) + 1), ((hour * 4) + 2), ((hour * 4) + 3)].includes(s)) } : a));
                                                        } else {
                                                            setBlockedSlots(blockedSlots.map(a => a.date === day.date ? { ...a, slots: [...new Set([...a.slots, ((hour * 4) + 0), ((hour * 4) + 1), ((hour * 4) + 2), ((hour * 4) + 3)])] } : a));
                                                        }
                                                    }} className={`cursor-pointer rounded-t text-sm p-0.5 ${[((hour * 4) + 0), ((hour * 4) + 1), ((hour * 4) + 2), ((hour * 4) + 3)].every(value => blockedSlots.find(a => a.date === day.date)?.slots.includes(value)) ? "bg-red-500 text-white" : "bg-muted-foreground/20 text-muted-foreground"}`}>{`${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"} - ${(hour + 1) % 12 || 12} ${(hour + 1) < 12 ? "AM" : "PM"}`}</div>
                                                    <div className="flex p-0.5 gap-0.5">
                                                        {Array.from({ length: 4 }).map((_, slot) => (
                                                            <div key={slot} onClick={() => {
                                                                if (blockedSlots.find(a => a.date === day.date)?.slots.includes((hour * 4) + slot)) {
                                                                    setBlockedSlots(blockedSlots.map(a => a.date === day.date ? { ...a, slots: a.slots.filter(s => s !== ((hour * 4) + slot)) } : a));
                                                                } else {
                                                                    setBlockedSlots(blockedSlots.map(a => a.date === day.date ? { ...a, slots: [...a.slots, ((hour * 4) + slot)] } : a));
                                                                }
                                                            }} className={`cursor-pointer size-7 rounded ${blockedSlots.find(a => a.date === day.date)?.slots.includes((hour * 4) + slot) ? "bg-red-500" : "bg-muted-foreground/10"}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
