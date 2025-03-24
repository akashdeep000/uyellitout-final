"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import libphonenumber from "google-libphonenumber";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PhoneInput } from "../ui/phone-input";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();


export function PhoneNumberForm() {

    const formSchema = z.object({
        phoneNumber: z.string().nonempty({ message: "Mobile number is required" })
            .refine(
                (number) => {
                    try {
                        const phoneNumber = phoneUtil.parse(number);
                        return phoneUtil.isValidNumber(phoneNumber);
                    } catch {
                        return false;
                    }
                },
                { message: "Invalid mobile number" }
            ),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: ""
        }
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            await authClient.updateUser({
                phoneNumber: data.phoneNumber
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["session"] }); // Refresh category list
            form.reset();
        },
        onError: (error) => {
            console.error("Error adding category:", error);
        }
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        mutation.mutate(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem className="grid gap-2">
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                                <PhoneInput defaultCountry="IN" placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                    {mutation.isPending ? "Saving phone number..." : "Add phone number"}
                </Button>
            </form>
        </Form>
    );
}
