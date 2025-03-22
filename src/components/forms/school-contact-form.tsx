"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { submitForm } from "@/actions/form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import libphonenumber from "google-libphonenumber";
import { useEffect } from "react";
import { PhoneInput } from "../ui/phone-input";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

const formSchema = z.object({
  schoolName: z.string().min(2, "School name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  principalName: z.string().min(2, "Principal name must be at least 2 characters"),
  pocName: z.string().min(2, "POC name must be at least 2 characters"),
  designation: z.string().min(2, "Designation must be at least 2 characters"),
  contactNumber: z.string().nonempty({ message: "Contact number is required" })
    .refine(
      (number) => {
        try {
          const phoneNumber = phoneUtil.parse(number);
          return phoneUtil.isValidNumber(phoneNumber);
        } catch {
          return false;
        }
      },
      { message: "Invalid contact number" }
    ),
  whatsappNumber: z.string().nonempty({ message: "Whatsapp number is required" })
    .refine(
      (number) => {
        try {
          const phoneNumber = phoneUtil.parse(number);
          return phoneUtil.isValidNumber(phoneNumber);
        } catch {
          return false;
        }
      },
      { message: "Invalid whatsapp number" }
    ),
  email: z.string().email("Invalid email address"),
  serviceRequired: z.string().min(2, "Service required must be at least 2 characters"),
  additionalRemarks: z.string().optional(),
  bestTimeToContact: z.string().min(2, "Best time to contact must be specified"),
});


export function SchoolContactForm({ defaultService }: {
  defaultService?: string
}) {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your form has been submitted successfully.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolName: "",
      location: "",
      website: "",
      principalName: "",
      pocName: "",
      designation: "",
      contactNumber: "",
      whatsappNumber: "",
      email: "",
      serviceRequired: defaultService || "",
      additionalRemarks: "",
      bestTimeToContact: "",
    },
  });


  useEffect(() => {
    (async () => {
      const session = await authClient.getSession();
      if (session.data?.user) {
        form.setValue("email", session.data.user.email);
        if (session.data.user.phoneNumber) {
          form.setValue("contactNumber", session.data.user.phoneNumber);
          form.setValue("whatsappNumber", session.data.user.phoneNumber);
        }
      }
    })();
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      formName: "School Contact Form",
      data: {
        schoolName: values.schoolName,
        location: values.location,
        website: values.website,
        principalName: values.principalName,
        pocName: values.pocName,
        designation: values.designation,
        contactNumber: values.contactNumber,
        whatsappNumber: values.whatsappNumber,
        email: values.email,
        serviceRequired: values.serviceRequired,
        additionalRemarks: values.additionalRemarks,
        bestTimeToContact: values.bestTimeToContact,
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="schoolName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter school name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location (City & State)</FormLabel>
              <FormControl>
                <Input placeholder="Enter city and state" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Website (if available)</FormLabel>
              <FormControl>
                <Input placeholder="Enter school website URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="principalName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Principal&apos;s Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter principal's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pocName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Point of Contact (POC) Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter POC name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designation (of POC)</FormLabel>
              <FormControl>
                <Input placeholder="Enter POC designation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <PhoneInput defaultCountry="IN" placeholder="Enter contact number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsappNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Number</FormLabel>
              <FormControl>
                <PhoneInput defaultCountry="IN" placeholder="Enter WhatsApp number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter email address" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceRequired"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specific Service Required</FormLabel>
              <FormControl>
                <Input placeholder="Enter required service" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalRemarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Remarks</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter any additional remarks" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bestTimeToContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Best Time to Contact (Mention Time Range)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 9:00 AM - 5:00 PM" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}