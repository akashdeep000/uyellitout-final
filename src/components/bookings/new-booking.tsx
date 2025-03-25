"use client";

import { createRazorpayOrder, getNext30DaysAvailableDays } from "@/actions/booking";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { packages, services } from "@/configs/data";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { convertDateSlots, slotToTime } from "@/lib/utils";
import { orderSchema } from "@/schema/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Orders } from "razorpay/dist/types/orders";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RazorpayOrderOptions, useRazorpay } from "react-razorpay";
import { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { PhoneInput } from "../ui/phone-input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { DateSelector } from "./date-selector";

type Modify<T, K extends keyof T, R> = Omit<T, K> & { [P in K]: R };
type FormDataType = Modify<z.infer<typeof orderSchema>, "startingSlot", string | undefined>

export function NewBooking({ defaultProductType, defaultProductId, onSuccess, isNested = false }: {
    defaultProductType?: "service" | "package",
    defaultProductId?: number;
    onSuccess?: (orderId: string) => void;
    isNested?: boolean;
}) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { error: razorpayError, isLoading: razorpayLoading, Razorpay } = useRazorpay();
    const [paymentState, setPaymentState] = useState<"creating-order" | "redirecting" | null>(null);

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [date, setDate] = useState<Date | undefined>();
    const [slots, setSlots] = useState<number[] | undefined>();

    const { toast } = useToast();

    const { data: availability, refetch: refetchAvailability } = useQuery({
        queryKey: ["availability"],
        queryFn: async () => {
            const data = await getNext30DaysAvailableDays();
            return convertDateSlots(data, 0, -(new Date()).getTimezoneOffset());
        },
    });

    useEffect(() => {
        if (!date) return;
        console.log(availability?.find((day) => day.date.toLocaleDateString() === date.toLocaleDateString()));

        setSlots(availability?.find((day) => day.date.toLocaleDateString() === date.toLocaleDateString())?.slots);
    }, [availability, date]);


    const form = useForm<FormDataType>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            productType: defaultProductType || "service",
            productId: defaultProductId || 0,
            productCount: 1,
            name: "",
            email: "",
            phoneNumber: "",
            age: undefined,
            date: undefined,
            startingSlot: undefined,
            message: "",
            emergencyContactPerson: "",
            emergencyContactNumber: "",
            emergencyContactRelation: "",
            consent: false,
        }
    });

    useEffect(() => {
        (async () => {
            const session = await authClient.getSession();
            if (session.data?.user) {
                setIsLoggedin(true);
                form.reset({
                    productType: "service",
                    productId: 0,
                    productCount: 1,
                    name: session.data.user.name,
                    email: session.data.user.email,
                    // phoneNumber: session.data.user.phoneNumber || undefined,
                    phoneNumber: "",
                    age: undefined,
                    date: undefined,
                    startingSlot: undefined,
                    message: "",
                    emergencyContactPerson: "",
                    emergencyContactNumber: "",
                    emergencyContactRelation: "",
                    consent: false
                });
            }
        })();
    }, [form]);


    const queryClient = useQueryClient();

    const handlePayment = async (data: FormDataType) => {
        console.log({ data });

        // eslint-disable-next-line n/no-process-env
        const RASORPAY_KEY_ID = process.env.NEXT_PUBLIC_RASORPAY_KEY_ID;
        if (!RASORPAY_KEY_ID) {
            console.log("NEXT_PUBLIC_RASORPAY_KEY_ID is not defined");
            return;
        }
        setPaymentState("creating-order");
        let order: Orders.RazorpayOrder;
        try {
            order = await createRazorpayOrder({
                ...data,
                date: convertDateSlots([{
                    date: data.date!,
                    slots: [Number(data.startingSlot!)]
                }], -(new Date()).getTimezoneOffset(), 0)[0].date,
                startingSlot: convertDateSlots([{
                    date: data.date!,
                    slots: [Number(data.startingSlot!)]
                }], -(new Date()).getTimezoneOffset(), 0)[0].slots[0],
            });
        } catch (error) {
            setPaymentState(null);
            console.log(error);
            toast({
                title: "Error",
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                description: error?.message || "Something went wrong. Please try again later.",
                variant: "destructive",
            });
            return;
        }

        setPaymentState("redirecting");
        const options: RazorpayOrderOptions = {
            key: RASORPAY_KEY_ID,
            amount: Number(order.amount), // Amount in paise
            currency: "INR",
            name: "uyellitout",
            description: `Payment for ${form.getValues("productCount")}x ${data.productType === "service" ? services[data.productId].title : packages[data.productId].title}`,
            order_id: order.id, // Generate order_id on server
            handler: () => {
                setPaymentState(null);
                queryClient.invalidateQueries({ queryKey: ["bookings"] });
                queryClient.invalidateQueries({ queryKey: ["upcoming-bookings"] });
                queryClient.invalidateQueries({ queryKey: ["not-scheduled-bookings"] });
                toast({
                    title: "Payment successful",
                    description: "Payment successful. Please check your email for confirmation.",
                    variant: "default",
                });
                onSuccess?.(order.id);
            },
            prefill: {
                name: data.name,
                email: data.email,
                contact: data.phoneNumber,
            },
            theme: {
                color: "#F37254",
            }
        };

        const razorpayInstance = new Razorpay(options);
        razorpayInstance.on("payment.failed", (response) => {
            setPaymentState(null);
            console.log(response.error.description);
            toast({
                title: response.error.reason,
                description: response.error.description,
                variant: "destructive",
            });
        });
        razorpayInstance.open();
    };

    return (
        <div className="space-y-6 p-6 bg-white z-[45]">
            <div>
                <p className="text-2xl">Book your appointment now</p>
                <p>So our team can reach out to you on time</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handlePayment)}>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <p className="text-sm">Choose services or packages</p>
                                <Select defaultValue={(defaultProductType && defaultProductId) ? `${defaultProductType.charAt(0)}-${defaultProductId}` : "s-0"} onValueChange={(value) => {
                                    const [type, id] = value.split("-");
                                    form.setValue("productType", type === "s" ? "service" : "package");
                                    form.setValue("productId", Number(id));
                                }}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select services or package" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Services</SelectLabel>
                                            {
                                                services.filter((e, i) => i < 4).map((service, index) => (
                                                    <SelectItem key={`s-${index}`} value={`s-${index}`}>
                                                        <div className="flex gap-2">
                                                            <p> {service.title}</p>
                                                            <p>-</p>
                                                            <p className="text-muted-foreground">₹{service.price}</p>
                                                        </div>
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                        {/* <SelectGroup>
                                            <SelectLabel>Packages</SelectLabel>
                                            {
                                                packages.map((pkg, index) => (
                                                    <SelectItem key={`p-${index}`} value={`p-${index}`}>
                                                        <div className="flex gap-2">
                                                            <p> {pkg.title}</p>
                                                            <p>-</p>
                                                            <p className="text-muted-foreground">₹{pkg.price}</p>
                                                        </div>
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectGroup> */}
                                    </SelectContent>
                                </Select>
                            </div>
                            {
                                isLoggedin && <FormField control={form.control} name="productCount" render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel>Number of session</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Number of session" value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            }
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel>Full name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Full name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control} name="email" render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Phone number</FormLabel>
                                    <FormControl>
                                        <PhoneInput defaultCountry="IN" placeholder="Phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="age" render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Age</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Age" value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="message" render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Message (optional)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Your message" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <div className="space-y-6 flex-1">
                            <div className="gap-6 flex flex-col">
                                <FormField control={form.control} name="date" render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            {
                                                isNested ?
                                                    <div className="grid place-items-center">
                                                        <Calendar
                                                            className=""
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
                                                    </div>
                                                    :
                                                    <DateSelector selected={field.value} onSelect={(date) => {
                                                        if (date) {
                                                            console.log("setting date", date);
                                                            const convertedDate = availability?.find((day) => day.date.toLocaleDateString() === date.toLocaleDateString())?.date;
                                                            console.log({ convertedDate });

                                                            if (convertedDate) {
                                                                form.setValue("date", convertedDate);
                                                                setDate(convertedDate);
                                                            }
                                                        }
                                                    }} />
                                            }
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
                                <FormField
                                    control={form.control}
                                    name="emergencyContactPerson"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Emergency contact person name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Emergency contact person name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField control={form.control} name="emergencyContactNumber" render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel>Emergency contact person&apos;s phone number</FormLabel>
                                        <FormControl>
                                            <PhoneInput defaultCountry="IN" placeholder="Phone number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="emergencyContactRelation" render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel>Relation with emergency contact person</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Relation with emergency contact person" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField
                                    control={form.control}
                                    name="consent"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <div className="flex items-center space-x-2">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal flex gap-2">
                                                    <p>I agree to the
                                                        <Dialog>
                                                            <DialogTrigger className="text-blue-500 underline px-2">terms and conditions</DialogTrigger>
                                                            <DialogContent className="overflow-y-scroll max-h-svh sm:max-h-[80svh]">
                                                                <DialogHeader>
                                                                    <DialogTitle>Client Consent Notice for Counseling Services</DialogTitle>
                                                                    <DialogDescription>
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <section>
                                                                    <h2 className="text-lg font-semibold mb-2">Introduction</h2>
                                                                    <p className="text-gray-700">Thank you for choosing our counseling services. This consent form outlines important information regarding your participation in counseling sessions. Please read this carefully before proceeding with your booking.</p>
                                                                </section>

                                                                <section>
                                                                    <h2 className="text-lg font-semibold mb-2">1. Nature of Counseling Services</h2>
                                                                    <p className="text-gray-700">Counseling involves discussing personal challenges, emotions, and thoughts to facilitate personal growth and well-being. While counseling can be beneficial, there are no guarantees regarding specific outcomes.</p>
                                                                </section>

                                                                <section>
                                                                    <h2 className="text-lg font-semibold mb-2">2. Confidentiality</h2>
                                                                    <ul className="text-gray-700 list-disc pl-5">
                                                                        <li>If there is a risk of harm to yourself or others.</li>
                                                                        <li>If there is suspected abuse of a minor, elderly person, or vulnerable individual.</li>
                                                                        <li>If required by law or court order.</li>
                                                                        <li>If you provide written consent to share information with a third party.</li>
                                                                    </ul>
                                                                </section>

                                                                <section>
                                                                    <h2 className="text-lg font-semibold mb-2">3. Online Counseling Considerations</h2>
                                                                    <p className="text-gray-700">If sessions are conducted online, ensure a private and secure space to maintain confidentiality. The platform used will strive to maintain security; however, complete privacy over the internet cannot be guaranteed.</p>
                                                                </section>

                                                                <section>
                                                                    <h2 className="text-lg font-semibold mb-2">4. Fees & Cancellation Policy</h2>
                                                                    <ul className="text-gray-700 list-disc pl-5">
                                                                        <li>Payment must be made before the session begins.</li>
                                                                        <li>Cancellations or rescheduling requests should be made at least 24 hours in advance. Late cancellations may be subject to charges.</li>
                                                                    </ul>
                                                                </section>

                                                                <section>
                                                                    <h2 className="text-lg font-semibold mb-2">5. Client Responsibilities</h2>
                                                                    <ul className="text-gray-700 list-disc pl-5">
                                                                        <li>Actively participate in sessions and engage in the therapeutic process.</li>
                                                                        <li>Communicate openly about any concerns regarding counseling.</li>
                                                                        <li>Seek emergency medical or psychiatric help if experiencing a crisis beyond the scope of counseling services.</li>
                                                                    </ul>
                                                                </section>

                                                                <section>
                                                                    <h2 className="text-lg font-semibold mb-2">6. Voluntary Participation & Right to Withdraw</h2>
                                                                    <p className="text-gray-700">You have the right to withdraw from counseling at any time. If you wish to discontinue, you may discuss this with your counselor for proper closure and referrals if needed.</p>
                                                                </section>

                                                                <section>
                                                                    <h2 className="text-lg font-semibold mb-2">7. Limitation of Services</h2>
                                                                    <p className="text-gray-700">Counseling is not a substitute for medical treatment or psychiatric care. If a higher level of care is required, referrals will be provided.</p>
                                                                </section>

                                                                <section>
                                                                    <h2 className="text-lg font-semibold mb-2">8. Informed Consent Acknowledgment</h2>
                                                                    <p className="text-gray-700">By checking this box and proceeding with the booking, you acknowledge that:</p>
                                                                    <ul className="text-gray-700 list-disc pl-5">
                                                                        <li>You have read and understood this consent form.</li>
                                                                        <li>You agree to the terms outlined above.</li>
                                                                        <li>You have read and understood this consent form.</li>
                                                                    </ul>
                                                                </section>
                                                            </DialogContent>
                                                        </Dialog>
                                                        of counseling services</p>
                                                </FormLabel>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <Button className="float-right" type="submit" size="lg" disabled={paymentState !== null}>
                                        {paymentState === "creating-order" ? "Creating order..." : paymentState === "redirecting" ? "Redirecting..." : "Book Now"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
            {/* <pre>
                {JSON.stringify(availability, null, 2)}
            </pre> */}
        </div >
    );
}
