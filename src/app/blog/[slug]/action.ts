"use server";

import { db } from "@/db";
import { post } from "@/db/schema";
import { eq } from "drizzle-orm";

async function incrementViewCount(id: string) {
    // Fetch the current view count and post info
    const postRes = await db
        .select({
            id: post.id,
            views: post.views,
        })
        .from(post)
        .where(eq(post.id, id))
        .limit(1);

    if (postRes.length > 0) {
        const currentViews = postRes[0].views;
        // Increment the view count by 1
        await db
            .update(post)
            .set({ views: currentViews + 1 })
            .where(eq(post.id, postRes[0].id));
    }
}

export { incrementViewCount };
