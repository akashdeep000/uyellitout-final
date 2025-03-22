"use client";

import { AdminPageWrapper } from "@/components/admin/page-wraper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type ListUsersOptions = Parameters<typeof authClient.admin.listUsers>[0];

type ListUsersQueryParams = ListUsersOptions extends { query?: infer Q }
    ? Q
    : undefined;

export default function Page() {

    const [usersQuery, setUsersQuery] = useState<ListUsersQueryParams>({
        limit: 15,
        offset: 0,
        searchValue: "",
    });

    const { data: usersData, isLoading } = useQuery({
        queryKey: ["users", usersQuery],
        queryFn: async () => {
            const users = await authClient.admin.listUsers({
                query: usersQuery
            });
            return users.data;
        }
    });

    return (
        <AdminPageWrapper className="space-y-4" breadcrumb={[{ title: "Users" }]}>
            <div className="flex gap-2 mb-4">
                <Input
                    placeholder="Search by name or email..."
                    value={usersQuery.searchValue}
                    onChange={(e) => setUsersQuery(prev => ({ ...prev, searchValue: e.target.value, offset: 0 }))}
                    className="max-w-sm"
                />
            </div>
            <Table className="w-full border-b">
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-semibold">Avatar</TableHead>
                        <TableHead className="font-semibold">Name</TableHead>
                        <TableHead className="font-semibold">Email</TableHead>
                        <TableHead className="font-semibold">Role</TableHead>
                        <TableHead className="font-semibold">Phone Number</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                Loading...
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoading && usersData?.users.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No users found.
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoading && usersData && usersData.users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage className="bg-muted-foreground/10" src={user.image || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.id}`} />
                                    <AvatarFallback>{user.name.split("")[0]}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{
                                //@ts-expect-error better-auth type error
                                user.phoneNumber
                            }</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setUsersQuery(prev => ({ ...prev, offset: Math.max(0, Number(prev.offset) - Number(prev.limit)) }))}
                            disabled={usersQuery.offset === 0}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setUsersQuery(prev => ({ ...prev, offset: Number(prev.offset) + Number(prev.limit) }))}
                            disabled={!usersData || (usersData.users.length < Number(usersQuery.limit))}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </AdminPageWrapper>
    );
}
