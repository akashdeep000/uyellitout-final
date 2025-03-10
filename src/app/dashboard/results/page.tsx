import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";

export default function ResultsPage() {
    return (
        <div className="bg-background border rounded-xl">
            <Table>
                <TableHeader>
                    <TableRow className="text-md rounded-xl">
                        <TableHead className="min-w-28 font-semibold bg-neutral-200 rounded-tl-xl">Date</TableHead>
                        <TableHead className="font-semibold bg-neutral-200">Quiz Title</TableHead>
                        <TableHead className="text-center font-semibold bg-neutral-200">Points</TableHead>
                        <TableHead className="px-0 font-semibold bg-neutral-200 rounded-tr-xl"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">21-06-2024</TableCell>
                        <TableCell>Demo quiz for a really long tittle</TableCell>
                        <TableCell className="text-center">67</TableCell>
                        <TableCell className="px-0">
                            <DropdownMenu>
                                <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Details</DropdownMenuItem>
                                    <DropdownMenuItem>Share</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}