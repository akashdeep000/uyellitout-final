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
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function ResetPasswordForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") as string;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading">("idle");


    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [token, router]);

    const formSchema = z.object({
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }).max(36, {
            message: "Password must be at most 36 characters.",
        }),
        confirmPassword: z.string()
    }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"], // This will point the error to the confirmPassword field
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setStatus("loading");
        authClient.resetPassword({
            newPassword: values.password,
            token
        }, {
            onSuccess: () => {
                toast({
                    title: "Password reset successfully",
                    description: "Please login with your new password",
                });
                setStatus("idle");
                router.push("/login");
            },
            onError: (error) => {
                toast({
                    title: "Failed to reset password",
                    description: error.error.message,
                    variant: "destructive"
                });
                setStatus("idle");
            },
        });
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Reset Password</CardTitle>
                    <CardDescription>
                        Please enter the new password you want to set. Must be longer then 8 charecter.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-2">
                                                <FormLabel>New password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input type={showPassword ? "text" : "password"} placeholder="Password" {...field} />
                                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
                                                            <Button type="button" onClick={() => setShowPassword(!showPassword)} size="icon" variant="ghost">
                                                                {
                                                                    showPassword ? <Eye /> : <EyeOff />
                                                                }
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-2">
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" {...field} />
                                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
                                                            <Button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} size="icon" variant="ghost">
                                                                {
                                                                    showConfirmPassword ? <Eye /> : <EyeOff />
                                                                }
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button disabled={status !== "idle"} type="submit" className="w-full">
                                        {status === "loading" ? "Resetting..." : "Reset password"}
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
