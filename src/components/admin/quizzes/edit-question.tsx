"use client";

import { NewQuestion, Question, updateQuestion } from "@/actions/quiz";
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
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    question: z.string().min(5, "Question must be at least 5 characters.").max(255, "Too long."),
    options: z.array(
        z.object({
            option: z.string().min(1, "Option cannot be empty.")
        })
    ).min(2, "At least two options required."),
    quizId: z.string().min(1, "Quiz ID is required."),
});

export function EditQuestion({ question }: { question: Question }) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: question.question,
            options: question.options.map((option) => ({ option })) || [],
            quizId: question.quizId
        },
    });

    useEffect(() => {
        if (question) {
            form.reset({
                question: question.question,
                options: question.options.map((option) => ({ option })) || [],
                quizId: question.quizId
            });
        }
    }, [question]);

    const { fields, append, remove } = useFieldArray({ control: form.control, name: "options" });

    const mutation = useMutation({
        mutationFn: async (data: Partial<NewQuestion>) => {
            return await updateQuestion(question.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questions", question.quizId] });
            form.reset();
            setOpen(false);
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const options = data.options.map((option) => option.option);
        mutation.mutate({ ...data, options });
    };

    return (
        <Dialog open={open} onOpenChange={(open) => {
            form.reset();
            setOpen(open);
        }}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Question</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Question Input */}
                        <FormField control={form.control} name="question" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Question</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter question" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="border p-4 rounded-md space-x-2 space-y-2">
                            <p className="text-sm font-semibold">Options</p>
                            {/* Options Inputs */}
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-end space-x-2">
                                    <FormField control={form.control} name={`options.${index}.option`} render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Option {index + 1}</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    {fields.length > 2 && (
                                        <Button type="button" variant="secondary" size="icon" onClick={() => remove(index)}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            {/* Add Option Button */}
                            <Button type="button" variant="secondary" onClick={() => append({ option: "" })}>
                                Add Option
                            </Button>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" disabled={mutation.isPending} className="w-full">
                            {mutation.isPending ? "Saving..." : "Save Question"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
