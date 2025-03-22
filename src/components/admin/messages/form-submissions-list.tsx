"use client";

import { getFormSubmissions } from "@/actions/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const ITEMS_PER_PAGE = 10;

export function FormSubmissionsList() {
    const { ref, inView } = useInView();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["form-submissions"],
        queryFn: ({ pageParam = 1 }) =>
            getFormSubmissions(pageParam, ITEMS_PER_PAGE),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (status === "pending") return (
        <div className="space-y-2">
            <Skeleton className="w-full h-12 rounded" />
            <Skeleton className="w-full h-12 rounded" />
            <Skeleton className="w-full h-12 rounded" />
        </div>
    );

    if (status === "error") return <div>Error loading submissions</div>;

    return (
        <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
                {data.pages.map((page) =>
                    page.submissions.map((submission) => (
                        <AccordionItem key={submission.id} value={submission.id.toString()}>
                            <AccordionTrigger>
                                <div className="flex justify-between w-full pr-4">
                                    <span>{submission.formName}</span>
                                    <span className="text-muted-foreground">
                                        {submission.createdAt.toLocaleString()}
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="bg-muted p-4 rounded-lg overflow-auto space-y-2">
                                    {
                                        submission.data && Object.entries(submission.data).map(([key, value]) => (
                                            <div key={key} className="">
                                                <span className="font-semibold">{key}: </span>
                                                <span>{value}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))
                )}
            </Accordion>

            <div ref={ref} className="h-10">
                {isFetchingNextPage && <div>Loading more...</div>}
            </div>
        </div>
    );
}