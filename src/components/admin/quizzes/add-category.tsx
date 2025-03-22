"use client";

import { addCategory } from "@/actions/quiz";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function AddCategory() {
    const [open, setOpen] = useState(false);

    // Form Schema
    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Category name must be at least 2 characters.",
        }).max(36, {
            message: "Category name must be at most 36 characters.",
        }),
        relatedTo: z.enum(["happiness", "anxiety", "stress", "mood", "intimacy"], {
            message: "Please select a valid category type.",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            relatedTo: "happiness", // Default value
        }
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] }); // Refresh category list
            form.reset();
            setOpen(false);
        },
        onError: (error) => {
            console.error("Error adding category:", error);
        }
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        mutation.mutate(data);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="h-9 w-9 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-muted text-muted-foreground hover:bg-muted-foreground/30 hover:text-foreground">
                <Plus />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new category</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Category name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name of the category" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="relatedTo"
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel>Related to</FormLabel>
                                    <FormControl>
                                        <select {...field} className="w-full p-2 border rounded-md">
                                            <option value="happiness">Happiness</option>
                                            <option value="anxiety">Anxiety</option>
                                            <option value="stress">Stress</option>
                                            <option value="mood">Mood</option>
                                            <option value="intimacy">Intimacy</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? "Adding..." : "Add Category"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
