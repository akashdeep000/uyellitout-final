"use client";

import { getCategories, getQuizById, updateQuiz } from "@/actions/quiz";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

export function EditQuiz({ id }: { id: string }) {
    const [open, setOpen] = useState(false);
    const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: getCategories });
    const { data: quiz } = useQuery({ queryKey: [`quiz-${id}`], queryFn: () => getQuizById(id) });
    // Form Schema
    const formSchema = z.object({
        title: z.string().min(2, { message: "Quiz title must be at least 2 characters." }).max(100, { message: "Quiz title must be at most 100 characters." }),
        categoryId: z.string().min(1, { message: "Category is required." }),
        defaultMarks: z.array(z.number()).nonempty({ message: "At least one default mark is required." }),
        grades: z.array(
            z.object({
                percent: z.number().min(0).max(100),
                title: z.string().min(1),
                description: z.string().min(1),
                tips: z.array(
                    z.object({
                        title: z.string().min(1),
                        description: z.string().min(1),
                        image: z.string().startsWith("data:", "Image is required"), // Base64 string
                    })
                ).nonempty()
            })
        ).nonempty()
    });

    console.log(quiz);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            categoryId: "",
            defaultMarks: [],
            grades: []
        }
    });

    useEffect(() => {
        if (quiz) {
            form.reset(quiz);
        }
    }, [quiz]);

    const { fields, append, remove, update } = useFieldArray({ control: form.control, name: "grades" });
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            return await updateQuiz(id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["quizzes", id] });
            form.reset();
            setOpen(false);
        },
        onError: (error) => {
            console.error("Error updating quiz:", error);
        }
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        mutation.mutate(data);
    };

    const handleImageUpload = (gradeIndex: number, tipIndex: number, file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            form.setValue(`grades.${gradeIndex}.tips.${tipIndex}.image`, reader.result as string);
            form.clearErrors(`grades.${gradeIndex}.tips.${tipIndex}.image`);
        };
        reader.onerror = () => {
            console.error("Error reading file");
        };
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
            <DialogContent className="max-h-[80svh] sm:max-w-[80svw] overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>Add new quiz</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel>Quiz Title</FormLabel>
                                <FormControl><Input placeholder="Enter quiz title" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="categoryId" render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(cat => (
                                                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="defaultMarks" render={({ field }) => (
                            <FormItem className="grid gap-2">
                                <FormLabel>Options Marks</FormLabel>
                                <FormControl><Input placeholder="Seperated by comma (,)" value={field.value.join(",")} onChange={(e) => {
                                    // let remove = false;
                                    // if (field.value[field.value.length - 1] === 0 && e.target.value.split(",")[e.target.value.split(",").length - 1] === "") {
                                    //     remove = true;
                                    // }
                                    // const marks = e.target.value.split(",").filter((item, index) => (z.coerce.number().safeParse(item).success || (item === "" && item === "" && index === e.target.value.split(",").length - 1)) && (!remove || index !== e.target.value.split(",").length - 1));
                                    const marks = e.target.value.split(",");
                                    field.onChange(marks.map(item => Number(item)));
                                }} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="flex gap-3 items-center">
                            <p className="font-semibold">Grades</p>
                            <Button type="button" size="icon" variant="secondary" onClick={() => append({
                                percent: 0,
                                title: "",
                                description: "",
                                tips: [
                                    {
                                        title: "",
                                        description: "",
                                        image: ""
                                    }
                                ]
                            })}>
                                <Plus />
                            </Button>
                        </div>
                        <ScrollArea className="whitespace-nowrap rounded-md w-[calc(100svw_-_3.5rem)] sm:w-[calc(80svw_-_3.5rem)]">
                            <div className="flex w-max space-x-4">
                                {fields?.map((field, gradeIndex) => (
                                    <div key={field.id} className="space-y-4 border p-4 rounded-md">

                                        <FormField control={form.control} name={`grades.${gradeIndex}.percent`} render={({ field }) => (
                                            <FormItem>
                                                <div className="flex justify-between items-center gap-2">
                                                    <FormLabel>Grade Percent</FormLabel>
                                                    <Button disabled={gradeIndex === 0} type="button" onClick={() => remove(gradeIndex)} size="icon" variant="secondary"><Trash /></Button>
                                                </div>
                                                <FormControl><Input disabled={gradeIndex === 0} placeholder={gradeIndex === 0 ? "Default" : ""} type="number" value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name={`grades.${gradeIndex}.title`} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Grade Title</FormLabel>
                                                <FormControl><Textarea rows={2} {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name={`grades.${gradeIndex}.description`} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Grade Description</FormLabel>
                                                <FormControl><Textarea rows={5} {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <div className="flex gap-3 items-center">
                                            <p className="text-sm font-semibold">Tips</p>
                                            <Button type="button" size="icon" variant="secondary" onClick={() => update(gradeIndex, {
                                                ...form.getValues("grades")[gradeIndex],
                                                tips: [...form.getValues("grades")[gradeIndex].tips, {
                                                    title: "",
                                                    description: "",
                                                    image: ""
                                                }]
                                            })}>
                                                <Plus />
                                            </Button>
                                        </div>
                                        <ScrollArea className="whitespace-nowrap rounded-md w-[calc(100svw_-_8rem)] sm:w-[20rem]">
                                            <div className="flex w-max space-x-4">
                                                {field?.tips?.map((tip, tipIndex) => (
                                                    <div key={tipIndex} className="space-y-4 border p-4 rounded-md">
                                                        <FormField control={form.control} name={`grades.${gradeIndex}.tips.${tipIndex}.title`} render={({ field }) => (
                                                            <FormItem>
                                                                <div className="flex justify-between items-center gap-2">
                                                                    <FormLabel>Tip Title</FormLabel>
                                                                    <Button disabled={tipIndex === 0} type="button" onClick={() => {
                                                                        const updatedTips = form.getValues("grades")[gradeIndex].tips.filter((_, index) => index !== tipIndex);
                                                                        update(gradeIndex, {
                                                                            ...form.getValues("grades")[gradeIndex],
                                                                            tips: updatedTips as [{
                                                                                title: string;
                                                                                description: string;
                                                                                image: string;
                                                                            }, ...{
                                                                                title: string;
                                                                                description: string;
                                                                                image: string;
                                                                            }[]]
                                                                        });
                                                                    }} size="icon" variant="secondary">
                                                                        <Trash />
                                                                    </Button>
                                                                </div>
                                                                <FormControl><Textarea rows={2} {...field} /></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                        <FormField control={form.control} name={`grades.${gradeIndex}.tips.${tipIndex}.description`} render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Tip Description</FormLabel>
                                                                <FormControl><Textarea rows={5} {...field} /></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                        <FormField control={form.control} name={`grades.${gradeIndex}.tips.${tipIndex}.image`} render={() => (
                                                            <FormItem>
                                                                <FormLabel>Tip Image</FormLabel>
                                                                {
                                                                    form.getValues(`grades.${gradeIndex}.tips.${tipIndex}.image`) ?
                                                                        <img className="h-32 rounded" src={form.getValues(`grades.${gradeIndex}.tips.${tipIndex}.image`)} alt="" />
                                                                        : <div className="h-32 bg-muted-foreground/20 rounded"></div>
                                                                }
                                                                <FormControl>
                                                                    <Input type="file" onChange={(e) => {
                                                                        if (e.target.files) {
                                                                            handleImageUpload(gradeIndex, tipIndex, e.target.files[0]);
                                                                        }
                                                                    }} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                    </div>
                                                ))}
                                            </div>
                                            <ScrollBar orientation="horizontal" />
                                        </ScrollArea>
                                    </div>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? "Saving Changes..." : "Save Quiz"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}