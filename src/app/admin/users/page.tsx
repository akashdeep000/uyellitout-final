"use client";

import { AdminPageWrapper } from "@/components/admin/page-wraper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type ListUsersOptions = Parameters<typeof authClient.admin.listUsers>[0];

type ListUsersQueryParams = ListUsersOptions extends { query?: infer Q }
    ? Q
    : undefined;

export default function Page() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [usersQuery, setUsersQuery] = useState<ListUsersQueryParams>({
        limit: 100
    });

    const { data: usersData } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const users = await authClient.admin.listUsers({
                query: usersQuery
            });
            return users.data;
        }
    });

    return (
        <AdminPageWrapper className="space-y-2" breadcrumb={[{ title: "Users" }]}>
            {/* <ScrollArea className="w-full whitespace-nowrap rounded-md border overflow-scroll"> */}
            <Table className="border w-full">
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Avatar</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        usersData && usersData.users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>

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
            {/* <ScrollBar orientation="horizontal" />
            </ScrollArea> */}
        </AdminPageWrapper>
    );
}
