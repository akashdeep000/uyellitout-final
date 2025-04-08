import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";

export const post = sqliteTable("post", {
    id: text("id").primaryKey().$defaultFn(() => ulid()),
    published: integer("published", { mode: "boolean" }).notNull().default(false),
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    excerpt: text("excerpt"),
    thumbnail: text("thumbnail"),
    content: text("content").notNull(),
    views: integer("views").notNull().default(0),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(new Date(Date.now())),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(new Date(Date.now())),
});

export const category = sqliteTable("category", {
    id: text("id").primaryKey().$defaultFn(() => ulid()),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(new Date(Date.now())),
});

export const postToCategory = sqliteTable("post_to_category", {
    postId: text("post_id").notNull().references(() => post.id, { onDelete: "cascade" }),
    categoryId: text("category_id").notNull().references(() => category.id, { onDelete: "cascade" }),
});

// Relations
export const postRelations = relations(post, ({ many }) => ({
    categories: many(postToCategory)
}));

export const categoryRelations = relations(category, ({ many }) => ({
    posts: many(postToCategory)
}));

export const postToCategoryRelations = relations(postToCategory, ({ one }) => ({
    post: one(post, {
        fields: [postToCategory.postId],
        references: [post.id],
    }),
    category: one(category, {
        fields: [postToCategory.categoryId],
        references: [category.id],
    }),
}));

export type Post = typeof post.$inferSelect;
export type NewPost = typeof post.$inferInsert;
export type Category = typeof category.$inferSelect;
export type NewCategory = typeof category.$inferInsert;
