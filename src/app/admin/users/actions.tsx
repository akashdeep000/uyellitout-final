"use server";

import { authClient } from "@/lib/auth-client";

export async function getUsers() {
    const users = await authClient.admin.listUsers({
        query: {
            searchField: "email",
            searchOperator: "contains",
            searchValue: "@example.com",
            limit: 10,
            offset: 0,
            sortBy: "createdAt",
            sortDirection: "desc",
            filterField: "role",
            filterOperator: "eq",
            filterValue: "admin"
        };
        return users
    });
}