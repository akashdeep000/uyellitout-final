"use server";

import { db } from "@/db";
import { and, eq, ne } from "drizzle-orm";

export async function checkSlugAvailability(slug: string, currentPostId?: string) {
  const existingPost = await db.query.post.findFirst({
    where: (post) => {
      if (currentPostId) {
        return and(eq(post.slug, slug), ne(post.id, currentPostId));
      }
      return eq(post.slug, slug);
    },
  });

  return !existingPost;
}