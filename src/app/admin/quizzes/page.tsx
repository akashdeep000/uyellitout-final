"use client";
import { deleteQuiz, getCategories, getQuizzes, getQuizzesByCategory, updateQuiz } from "@/actions/quiz";
import { AdminPageWrapper } from "@/components/admin/page-wraper";
import { AddCategory } from "@/components/admin/quizzes/add-category";
import { AddQuiz } from "@/components/admin/quizzes/add-quiz";
import { EditQuiz } from "@/components/admin/quizzes/edit-quiz";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState<string | null>(null);

    const queryClient = useQueryClient();

    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const { data: quizzes, isLoading: quizzesLoading, isError: quizzesError } = useQuery({
        queryKey: ["quizzes", selectedCategory],
        queryFn: () => (selectedCategory ? getQuizzesByCategory(selectedCategory) : getQuizzes()),
    });

    const deleteQuizMutation = useMutation({
        mutationFn: deleteQuiz,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["quizzes"] });
            setDeleteDialogOpen(false);
        },
    });

    const toggleQuizStatusMutation = useMutation({
        mutationFn: (quizId: string) => {
            return updateQuiz(quizId, { active: !quizzes?.find(quiz => quiz.id === quizId)?.active });
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["quizzes"] });
            queryClient.invalidateQueries({ queryKey: ["quiz", data.id] });
        },
    });

    return (
        <AdminPageWrapper className="space-y-4" breadcrumb={[{ title: "Quizzes" }]}>
            <ScrollArea>
                <div className="flex gap-2">
                    <div onClick={() => setSelectedCategory(null)}
                        className={cn("px-2.5 py-1 bg-muted rounded w-max cursor-pointer text-muted-foreground hover:bg-muted-foreground/30 hover:text-foreground",
                            !selectedCategory ? "bg-muted-foreground/30 text-foreground" : null)}>
                        All
                    </div>
                    {categoriesLoading && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="w-16 h-8 rounded" />)}
                    {categories?.map((category) => (
                        <div key={category.id} onClick={() => setSelectedCategory(category.id)}
                            className={cn("px-2.5 py-1 bg-muted rounded w-max cursor-pointer text-muted-foreground hover:bg-muted-foreground/30 hover:text-foreground",
                                selectedCategory === category.id ? "bg-muted-foreground/30 text-foreground" : null)}>
                            {category.name}
                        </div>
                    ))}
                    <AddCategory />
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div className="space-y-4">
                <div className="flex gap-4">
                    <h2 className="text-xl font-semibold">Quizzes</h2>
                    <AddQuiz />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quizzes?.map((quiz) => (
                        <div key={quiz.id} className="p-4 border rounded-lg shadow-sm flex hover:bg-muted">
                            <Link className="flex-1" href={`/admin/quizzes/${quiz.id}`}>
                                <div>
                                    <h3 className="text-lg font-semibold">{quiz.title}</h3>
                                    <p className="text-sm text-gray-500">Default Marks: {quiz.defaultMarks.join(",")}</p>
                                    <p className="text-sm text-gray-500">Total Questions: {quiz.totalQuestions}</p>
                                    <p className={quiz.active ? "text-green-600" : "text-red-600"}>{quiz.active ? "Active" : "Inactive"}</p>
                                </div>
                            </Link>
                            <div className="flex space-y-8 flex-col items-center h-full justify-between">
                                <EditQuiz id={quiz.id} />
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Quiz actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => toggleQuizStatusMutation.mutate(quiz.id)}>
                                            {quiz.active ? "Disable" : "Enable"}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => { setQuizToDelete(quiz.id); setDeleteDialogOpen(true); }}>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                    {quizzesLoading && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="w-full h-32 rounded" />)}
                    {quizzes?.length === 0 && <div className="text-muted-foreground">No quizzes found.</div>}
                    {quizzesError && <div className="text-muted-foreground">Error loading quizzes.</div>}
                </div>
            </div>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                    </DialogHeader>
                    <p>This action cannot be undone. Do you want to proceed?</p>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => quizToDelete && deleteQuizMutation.mutate(quizToDelete)}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminPageWrapper>
    );
}
