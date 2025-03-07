"use client";
import { deleteQuestion, getQuestionsByQuiz, getQuizById } from "@/actions/quiz";
import { AdminPageWrapper } from "@/components/admin/page-wraper";
import { AddQuestion } from "@/components/admin/quizzes/add-question";
import { EditQuestion } from "@/components/admin/quizzes/edit-question";
import { UploadQuizCSV } from "@/components/admin/quizzes/upload-csv";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { use, useState } from "react";

export default function QuizQuestionsPage({ params }: { params: Promise<{ id: string }> }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);

    const queryClient = useQueryClient();
    const { id } = use(params);

    const { data: quiz, isLoading: quizLoading } = useQuery({
        queryKey: ["quiz", id],
        queryFn: () => getQuizById(id),
    });

    const { data: questions, isLoading: questionsLoading } = useQuery({
        queryKey: ["questions", id],
        queryFn: () => getQuestionsByQuiz(id),
    });

    const deleteQuestionMutation = useMutation({
        mutationFn: deleteQuestion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questions", id] });
            setDeleteDialogOpen(false);
        }
    });

    return (
        <AdminPageWrapper className="space-y-4" breadcrumb={[{ title: "Quizzes", href: "/admin/quizzes" }, { title: quiz?.title || "Quiz" }, { title: "Manage Questions" }]}>
            <h2 className="text-xl font-semibold">Manage Questions for {quiz?.title}</h2>
            <div className="space-x-2">
                <AddQuestion quizId={id} />
                <UploadQuizCSV quizId={id} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questionsLoading && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="w-full h-28 rounded" />)}
                {questions?.map((question) => (
                    <div key={question.id} className="p-4 border rounded-lg shadow-sm hover:bg-muted flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">{question.question}</h3>
                            <p className="text-sm text-gray-500">Options: {question.options.join(", ")}</p>
                        </div>
                        <div className="flex space-y-2 flex-col items-center h-full justify-between">
                            <EditQuestion question={question} />
                            <Button variant="outline" size="icon" onClick={() => { setQuestionToDelete(question.id); setDeleteDialogOpen(true); }}><Trash /></Button>
                        </div>
                    </div>
                ))}
                {questions?.length === 0 && <div className="text-muted-foreground">No questions found.</div>}
            </div>
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                    </DialogHeader>
                    <p>This action cannot be undone. Do you want to proceed?</p>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => questionToDelete && deleteQuestionMutation.mutate(questionToDelete)}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminPageWrapper>
    );
}
