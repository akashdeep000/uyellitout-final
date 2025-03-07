"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { toast } = useToast();
  const [status, setStatus] = useState<"idle" | "loading" | "ratelimited">("idle");
  const [tryAfter, setTryAfter] = useState(30);

  const formSchema = z.object({
    email: z.string().email({
      message: "Invalid email address.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  });

  const startTimer = () => {
    let timer = tryAfter;
    const interval = setInterval(() => {
      if (timer > 0) {
        timer--;
        setTryAfter(timer);
      } else {
        setStatus("idle");
        setTryAfter(30);
        clearInterval(interval);
      }
    }, 1000);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setStatus("loading");
    authClient.forgetPassword({
      email: values.email,
      redirectTo: "/reset-password",
    },
      {
        onSuccess: () => {
          setStatus("ratelimited");
          toast({
            title: "Password reset link sent",
            description: "Please check your email for the reset link"
          });
          startTimer();
        },
        onError: (error) => {
          setStatus("idle");
          toast({
            title: "Failed to send password reset link",
            description: error.error.message,
            variant: "destructive"
          });
        },
      });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            Please enter your email address. We will send you an email to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button disabled={status !== "idle"} type="submit" className="w-full">
                    {
                      status === "loading" ? "Sending..." : status === "ratelimited" ? `Try after ${tryAfter} seconds` : "Send reset link"
                    }
                  </Button>
                </div>
                <div className="text-center text-sm">
                  <Link href="/login" className="underline underline-offset-4">
                    Back to login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
