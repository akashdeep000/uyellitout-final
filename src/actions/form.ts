"use server";

import { db } from "@/db";
import { formSubmission } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

export const submitForm = async (data: {
    formName: string,
    userId?: string,
    data?: Record<string, string | number | undefined>
}) => {
    const formSchema = z.object({
        formName: z.string(),
        userId: z.string().optional(),
        data: z.string()
            .transform((str, ctx) => {
                try {
                    return JSON.parse(str);
                } catch {
                    ctx.addIssue({ code: "custom", message: "Invalid JSON" });
                    return z.NEVER;
                }
            }).optional()
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