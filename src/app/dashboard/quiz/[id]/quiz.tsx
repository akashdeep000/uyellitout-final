"use client";
import { getQuestionsByQuiz, getQuizById, submitQuiz } from "@/actions/quiz";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Result } from "./result";

export function QuizList({ id }: { id: string }) {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [answers, setAnswers] = useState<{
        questionId: string;
        answerIndex: number;
    }[]>([]);

    const handle = useFullScreenHandle();

    const { data: quiz, isLoading: quizLoading } = useQuery({
        queryKey: ["quiz", id],
        queryFn: () => getQuizById(id),
    });

    const { data: questions, isLoading: questionsLoading } = useQuery({
        queryKey: ["questions", id],
        queryFn: () => getQuestionsByQuiz(id),
    });

    const mutation = useMutation({
        mutationFn: submitQuiz,
        onSuccess: () => {
            setShowResult(true);
        },
        onError: (error) => {
            console.error("Error adding category:", error);
        }
    });

    const handleSubmit = () => {
        mutation.mutate({
            quizId: id,
            answers: answers,
        });
    };

    return (
        <>
            <FullScreen handle={handle}>
                {!showResult ?
                    <div className="space-y-2 bg-background select-none min-h-full grid grid-rows-[auto_1fr]">
                        <div className="p-3 rounded-md bg-[#9ED6B7] space-y-4">
                            <div className="flex flex-row-reverse">
                                {handle.active === false ? (
                                    <Button onClick={handle.enter} variant={"outline"} size="icon"><Maximize2 /></Button>

                                ) : (
                                    <Button onClick={handle.exit} variant={"outline"} size="icon"><Minimize2 /></Button>
                                )}
                            </div>

                            {quiz && <h1 className="text-slate-800 font-semibold text-lg">Quiz: {quiz.title}</h1>}
                            {quizLoading &&
                                <Skeleton className="rounded-lg w-[80%] h-7" />
                            }
                            {questions && <>
                                <p className="float-right text-slate-800 font-semibold font-lg">{questionIndex + 1} / {questions.length}</p>
                                <Progress value={(questionIndex + 1) / (questions.length) * 100} className="w-full h-2" />
                            </>}
                            {questionsLoading && <div className="space-y-1">
                                <div className="flex">
                                    <div className="flex-1" />
                                    <Skeleton className="rounded-lg w-16 h-5" />
                                </div>
                                <Skeleton className="rounded-lg w-full h-2.5" />
                            </div>}
                        </div>
                        <div className="px-[5%] py-4 md:py-8 rounded-lg bg-teal-500/10 space-y-4">
                            <div className="max-w-4xl mx-auto space-y-4">
                                <div>
                                    <div className="rounded-lg px-4 py-8 bg-[#9ED6B7] text-slate-800 text-lg font-semibold">
                                        {questions && questions[questionIndex].question}
                                        {questionsLoading && <Skeleton className="rounded-lg w-[75%] h-8" />}
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {
                                        questions?.[questionIndex].options.map((option, index) => {
                                            return (
                                                <div key={index} onClick={() => {
                                                    const filteredAnswer = answers.filter((answer) => answer.questionId !== questions[questionIndex].id);
                                                    setAnswers([...filteredAnswer, {
                                                        questionId: questions[questionIndex].id,
                                                        answerIndex: index,
                                                    }]);
                                                    if ((questionIndex + 1) === questions.length) {
                                                        setSelectedOption(index);
                                                    }
                                                    if ((questionIndex + 1) === questions.length) return;
                                                    setQuestionIndex(questionIndex + 1);
                                                }} className={`rounded-lg p-4 b hover:bg-[#9ED6B7]/25 ${selectedOption === index ? "bg-[#9ED6B7]/25" : "bg-background"}`}>
                                                    <span className="font-semibold">{"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")[index] || ""} {"."}</span> {option?.toString() || "N/A"}
                                                </div>
                                            );
                                        })
                                    }
                                    {
                                        questionsLoading && Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="rounded-lg h-14" />)
                                    }
                                </div>
                                {
                                    (questionIndex + 1) === questions?.length && (
                                        <div className="flex flex-row-reverse">
                                            <Button onClick={handleSubmit} disabled={mutation.isPending || selectedOption === null} variant={"default"} className="bg-[#90DBB2] hover:bg-[#7ccfa1] text-black font-semibold">{mutation.isPending ? "Submitting..." : "Submit"}</Button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    : mutation.data && quiz ?
                        <Result percentage={mutation.data} quiz={quiz} />
                        : null
                }
            </FullScreen>
        </>

    );
}