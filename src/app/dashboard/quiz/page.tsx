"use client";

import { getCategories, getQuizzes, getQuizzesByCategory } from "@/actions/quiz";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const colours = ["#BBCA97", "#AACDC1", "#F6EAA1", "#B3D9BE", "#F0AA97"];
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const { data: quizzes, isLoading: quizzesLoading } = useQuery({
        queryKey: ["quizzes", selectedCategory],
        queryFn: () => (selectedCategory ? getQuizzesByCategory(selectedCategory) : getQuizzes()),
    });

    return (
        <div className="md:pt-3 lg:pt:4 space-y-4">
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
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div className="grid gap-4 max-w-4xl mx-auto">
                {quizzesLoading && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="w-full h-12 rounded" />)}
                {quizzes?.filter(quiz => quiz.active === true).length === 0 && <div className="p-4 text-muted-foreground text-center">No quizzes found.</div>}
                {
                    quizzes?.filter(quiz => quiz.active === true).map((quiz, index) => {
                        return (
                            <Link key={quiz.id} href={`/dashboard/quiz/${quiz.id}`}>
                                <div className={`bg-[${colours[index % 5]}] p-4 rounded-xl grid gap-4 grid-cols-[1fr_auto] items-center hover:scale-[1.02] transition-all`}>
                                    <div className="text-lg font-semibold self-center">{quiz.title}</div>
                                    <Button className={"bg-white hover:bg-white/70 font-semibold text-black shadow-lg"}>Start</Button>
                                </div>
                            </Link>
                        );
                    }
                    )
                }
            </div>
        </div>
    );
}