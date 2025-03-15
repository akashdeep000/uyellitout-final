"use client";

import { AdminPageWrapper } from "@/components/admin/page-wraper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
                    {
                        usersData && usersData.users.map((user) => (
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
            {/* <ScrollBar orientation="horizontal" />
            </ScrollArea> */}
        </AdminPageWrapper>
    );
}
