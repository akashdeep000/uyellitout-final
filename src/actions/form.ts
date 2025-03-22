"use server";

import { db } from "@/db";
import { formSubmission } from "@/db/schema";
import { auth } from "@/lib/auth";
import { count, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

export async function getFormSubmissions(page: number = 1, pageSize: number = 10) {
    const offset = (page - 1) * pageSize;

    const submissions = await db
        .select()
        .from(formSubmission)
        .orderBy(desc(formSubmission.createdAt))
        .limit(pageSize)
        .offset(offset);

    const totalCount = (await db
        .select({ total: count() })
        .from(formSubmission))[0].total;

    const hasMore = offset + pageSize < totalCount;

    return {
        submissions,
        hasMore,
        nextPage: page + 1
    };
}

export const submitForm = async (data: {
    formName: string,
    userId?: string,
    data?: Record<string, string | number | undefined>
}) => {
    const formSchema = z.object({
        formName: z.string(),
        userId: z.string().optional(),
        data: z.record(z.string())
    });
    const validatedData = formSchema.parse(data);
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.session?.userId;
    await db.insert(formSubmission).values({
        userId,
        ...validatedData
    });
};