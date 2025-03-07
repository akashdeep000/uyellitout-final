"use client";

import { createQuestionsByQuiz, NewQuestion } from "@/actions/quiz";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { csv2json } from "json-2-csv";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    file: z.instanceof(File, { message: "CSV file is required." }),
    deletePrevious: z.boolean().optional(),
});

// const quistionSchema = createSelectSchema(question);
// const quistionsSchema = z.array(quistionSchema);

export function UploadQuizCSV({ quizId }: { quizId: string }) {
    const [open, setOpen] = useState(false);
    const [questionCount, setQuestionCount] = useState<number | null>(null);
    const form = useForm<{ file: File; deletePrevious?: boolean }>({ resolver: zodResolver(formSchema) });

    const fileToJson = async (file: File) => {
        const text = await file.text();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const json = await new Promise<NewQuestion[]>((resolve, reject) => {
            const joinPreParsed = csv2json(text) as {
                [key: string]: string;
            }[];
            const formatedJson = joinPreParsed.map((all) => {
                const currentQn: {
                    question: string;
                    options: string[];
                } = {
                    question: "",
                    options: [],
                };

                Object.entries(all).forEach((value, index) => {
                    if (index === 0) currentQn.question = value[1];
                    else currentQn.options.push(value[1]);
                });

                return {
                    quizId,
                    ...currentQn
                };
            });

            // const jsonParsed = quistionsSchema.safeParse(joinPreParsed);
            // if (!jsonParsed.success) {
            //     reject(jsonParsed.error);
            //     return;
            // };

            resolve(formatedJson);
        });
        return json;
    };

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ file, deletePrevious }: { file: File; deletePrevious?: boolean }) => {
            const json = await fileToJson(file);
            return createQuestionsByQuiz(quizId, json, deletePrevious);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questions", quizId] });
            form.reset();
            setOpen(false);
            setQuestionCount(null);
        },
        onError: (error) => console.error("Error uploading CSV:", error),
    });

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const json = await fileToJson(file);
            setQuestionCount(json.length);
        } else {
            setQuestionCount(null);
            return;
        }
        form.setValue("file", file);
    };

    const onSubmit = (data: { file: File; deletePrevious?: boolean }) => {
        mutation.mutate(data);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Upload CSV</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Quiz CSV</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField control={form.control} name="file" render={() => (
                            <FormItem>
                                <FormLabel>CSV File</FormLabel>
                                <FormControl>
                                    <Input type="file" accept=".csv" onChange={handleFileChange} />
                                </FormControl>
                                {questionCount !== null && <p className="text-sm text-muted-foreground">{questionCount} questions will be uploaded.</p>}
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="deletePrevious" render={({ field }) => (
                            <FormItem className="flex items-center gap-2">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel>Delete previous questions</FormLabel>
                            </FormItem>
                        )} />
                        <Button type="submit" disabled={mutation.isPending} className="w-full">
                            {mutation.isPending ? "Uploading..." : "Upload"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}