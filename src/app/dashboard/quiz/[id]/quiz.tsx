"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import quizes from "../quizes.json";

export function QuizList({ topicIndex }: { topicIndex: number }) {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const handle = useFullScreenHandle();

    return (
        <>
            <FullScreen handle={handle}>
                <div className="space-y-2 bg-background select-none min-h-full grid grid-rows-[auto_1fr]">
                    <div className="p-3 rounded-md bg-[#9ED6B7] space-y-4">
                        <div className="flex flex-row-reverse">
                            {handle.active === false ? (
                                <Button onClick={handle.enter} variant={"outline"} size="icon"><Maximize2 /></Button>

                            ) : (
                                <Button onClick={handle.exit} variant={"outline"} size="icon"><Minimize2 /></Button>
                            )}
                        </div>
                        <h1 className="text-slate-800 font-semibold text-lg">Quiz: {quizes[topicIndex].topicTitle}</h1>
                        <p className="float-right text-slate-800 font-semibold font-lg">{questionIndex + 1} / {quizes[topicIndex].questions.length}</p>
                        <Progress value={(questionIndex + 1) / (quizes[topicIndex].questions.length) * 100} className="w-full h-2" />

                    </div>
                    <div className="px-[5%] py-4 md:py-8 rounded-lg bg-teal-500/10 space-y-4">
                        <div className="max-w-4xl mx-auto space-y-4">
                            <div>
                                <div className="rounded-lg px-4 py-8 bg-[#9ED6B7] text-slate-800 text-lg font-semibold">
                                    {quizes[topicIndex].questions[questionIndex].question}
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {
                                    quizes[topicIndex].questions[questionIndex].options.map((option, index) => {
                                        return (
                                            <div key={index} onClick={() => {
                                                if ((questionIndex + 1) === quizes[topicIndex].questions.length) {
                                                    setSelectedOption(index);
                                                }
                                                if ((questionIndex + 1) === quizes[topicIndex].questions.length) return;
                                                setQuestionIndex(questionIndex + 1);
                                            }} className={`rounded-lg p-4 b hover:bg-[#9ED6B7]/25 ${selectedOption === index ? "bg-[#9ED6B7]/25" : "bg-background"}`}>
                                                <span className="font-semibold">{index === 0 ? "A" : index === 1 ? "B" : index === 2 ? "C" : "D"} {"."}</span> {option.option}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            {

                                (questionIndex + 1) === quizes[topicIndex].questions.length && (
                                    <div className="flex flex-row-reverse">
                                        <Button variant={"default"} className="bg-[#90DBB2] hover:bg-[#7ccfa1] text-black font-semibold">Submit</Button>
                                    </div>
                                )
                            }

                        </div>

                    </div>
                </div>
            </FullScreen>
        </>

    );
}