"use client";

import { getQuizResultsByUser } from "@/actions/quiz";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

export default function ResultsPage() {
    const { data: quizResults, isLoading: quizResultsLoading } = useQuery({
        queryKey: ["quiz-results"],
        queryFn: () => getQuizResultsByUser()
    });

    return (
        <div className="bg-background border rounded-xl">
            <Table>
                <TableHeader>
                    <TableRow className="text-md rounded-xl">
                        <TableHead className="min-w-28 w-min font-semibold bg-neutral-200 rounded-tl-xl">Date</TableHead>
                        <TableHead className="font-semibold bg-neutral-200">Quiz Title</TableHead>
                        <TableHead className="text-center font-semibold bg-neutral-200">Points</TableHead>
                        <TableHead className="px-0 font-semibold bg-neutral-200 rounded-tr-xl"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {quizResultsLoading ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                Loading...
                            </TableCell>
                        </TableRow>
                    ) : quizResults?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                No quiz results found.
                            </TableCell>
                        </TableRow>
                    ) : quizResults?.map((result) => (
                        <TableRow key={result.id} className="text-md">
                            <TableCell className="font-medium">{(new Date(result.createdAt).toLocaleString())}</TableCell>
                            <TableCell className="font-medium">{result.quizName}</TableCell>
                            <TableCell className="text-center font-medium">{result.mark}/{result.total}</TableCell>
                            <TableCell className="px-0">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisVertical className="w-5 h-5" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem><Link href={`/dashboard/results/${result.id}`}>View Details</Link></DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}