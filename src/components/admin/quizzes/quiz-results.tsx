import { getQuizResultsWithUser } from "@/actions/quiz";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const ITEMS_PER_PAGE = 10;

export function QuizResults() {
    const [searchTerm, setSearchTerm] = useState("");
    const { ref, inView } = useInView();

    const {
        data,
        isLoading: quizResultsLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["quiz-results", searchTerm],
        queryFn: ({ pageParam = 1 }) =>
            getQuizResultsWithUser(pageParam, ITEMS_PER_PAGE, searchTerm || undefined),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    const allResults = data?.pages.flatMap(page => page.results) || [];

    console.log({ data });
    console.log({ allResults });



    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4 justify-between">
                <h2 className="text-xl font-semibold">Submissions</h2>
                <div className="flex justify-end">
                    <Input
                        placeholder="Search by user name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
            </div>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Quiz Name</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Marks</TableHead>
                            <TableHead>Percentage</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {quizResultsLoading && (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="space-y-2">
                                        {Array.from({ length: 3 }).map((_, i) => (
                                            <Skeleton key={i} className="w-full h-8 rounded" />
                                        ))}
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                        {allResults.length === 0 && !quizResultsLoading && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                        {allResults.map((result) => (
                            <TableRow key={result.id}>
                                <TableCell className="font-medium">{result.quizName}</TableCell>
                                <TableCell>{result.user.name}</TableCell>
                                <TableCell>{result.user.email}</TableCell>
                                <TableCell>{`${result.mark}/${result.total}`}</TableCell>
                                <TableCell>{((result.mark / result.total) * 100).toFixed(2)}%</TableCell>
                                <TableCell>{new Date(result.createdAt).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* Loading indicator */}
            <div ref={ref} className="flex justify-center py-4">
                {isFetchingNextPage && (
                    <div className="space-y-2">
                        <Skeleton className="w-full h-8 rounded" />
                        <Skeleton className="w-full h-8 rounded" />
                    </div>
                )}
            </div>
        </div>
    );
}