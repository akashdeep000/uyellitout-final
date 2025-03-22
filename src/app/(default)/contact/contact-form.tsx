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
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import libphonenumber from "google-libphonenumber";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  contact: z.string().nonempty({ message: "Mobile number is required" })
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
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your message has been sent successfully.",
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

  function onSubmit(values: FormValues) {
    mutation.mutate({
      formName: "Contact form",
      data: values
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-bold text-sm">Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} className="border-b border-gray-300 focus:outline-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-black font-bold text-sm">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} className="border-b border-gray-300 focus:outline-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-black font-bold text-sm">Contact No.</FormLabel>
                <FormControl>
                  <PhoneInput defaultCountry="IN" placeholder="Enter your contact number" {...field} className="border-b border-gray-300 focus:outline-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-bold text-sm">Subject</FormLabel>
              <FormControl>
                <Input placeholder="Enter your subject" {...field} className="border-b border-gray-300 focus:outline-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black font-bold text-sm">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your message"
                  {...field}
                  className="border-b border-gray-300 focus:outline-none"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="float-right px-4 py-2 bg-[#9ED6B7] text-white font-bold rounded-md hover:bg-black transition"
        >
          {mutation.isPending ? "Sending..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}