"use server";

import { db } from "@/db";
import { and, eq, ne } from "drizzle-orm";

export async function checkCategorySlugAvailability(slug: string, currentCategoryId?: string) {
  const existingCategory = await db.query.category.findFirst({
    where: (category) => {
      if (currentCategoryId) {
        return and(eq(category.slug, slug), ne(category.id, currentCategoryId));
      }
      return eq(category.slug, slug);
    },
  });

  return !existingCategory;
}