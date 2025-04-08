"use server";

import { db } from "@/db";
import { category, post, postToCategory } from "@/db/schema/blog-schema";
import { eq } from "drizzle-orm";

// Post actions
export async function getPosts() {
    return await db.query.post.findMany({
        with: {
            categories: {
                with: {
                    category: true
                }
            }
        },
        orderBy: (posts, { desc }) => [desc(posts.createdAt)]
    });
}

export async function getPost(id: string) {
    const result = await db.query.post.findFirst({
        where: eq(post.id, id),
        with: {
            categories: {
                with: {
                    category: true
                }
            }
        }
    });
    return result;
}

export async function createPost(data: {
    title: string;
    content: string;
    slug: string;
    excerpt?: string;
    thumbnail?: string;
    categoryIds: string[];
}) {
    const result = await db.transaction(async (tx) => {
        const [newPost] = await tx.insert(post).values({
            title: data.title,
            content: data.content,
            slug: data.slug,
            excerpt: data.excerpt,
            thumbnail: data.thumbnail,
        }).returning();

        if (data.categoryIds.length > 0) {
            await tx.insert(postToCategory).values(
                data.categoryIds.map(categoryId => ({
                    postId: newPost.id,
                    categoryId
                }))
            );
        }

        return newPost;
    });

    return result;
}

export async function updatePost(id: string, data: {
    title: string;
    content: string;
    slug: string;
    excerpt?: string;
    thumbnail?: string;
    categoryIds: string[];
}) {
    await db.transaction(async (tx) => {
        await tx.update(post)
            .set({
                title: data.title,
                content: data.content,
                slug: data.slug,
                excerpt: data.excerpt,
                thumbnail: data.thumbnail,
                updatedAt: new Date(Date.now()),
            })
            .where(eq(post.id, id));

        // Delete existing categories
        await tx.delete(postToCategory)
            .where(eq(postToCategory.postId, id));

        // Insert new categories
        if (data.categoryIds.length > 0) {
            await tx.insert(postToCategory).values(
                data.categoryIds.map(categoryId => ({
                    postId: id,
                    categoryId
                }))
            );
        }
    });

    return await getPost(id);
}

export async function deletePost(id: string) {
    await db.delete(post).where(eq(post.id, id));
}

export async function togglePostStatus(id: string, field: "published" | "featured") {
    const post_ = await db.query.post.findFirst({
        where: eq(post.id, id),
        columns: {
            published: true,
            featured: true
        }
    });

    if (!post_) return;

    await db.update(post)
        .set({
            [field]: !post_[field],
            updatedAt: new Date(Date.now())
        })
        .where(eq(post.id, id));

    return await getPost(id);
}

// Category actions
export async function getCategories() {
    return await db.query.category.findMany({
        orderBy: (cats, { asc }) => [asc(cats.name)]
    });
}

export async function getCategory(id: string) {
    return await db.query.category.findFirst({
        where: eq(category.id, id),
        with: {
            posts: {
                with: {
                    post: true
                }
            }
        }
    });
}

export async function createCategory(data: {
    name: string;
    slug: string;
    description?: string;
}) {
    const [result] = await db.insert(category).values(data).returning();
    return result;
}

export async function updateCategory(id: string, data: {
    name: string;
    slug: string;
    description?: string;
}) {
    await db.update(category)
        .set(data)
        .where(eq(category.id, id));
    return await getCategory(id);
}

export async function deleteCategory(id: string) {
    await db.delete(category).where(eq(category.id, id));
}