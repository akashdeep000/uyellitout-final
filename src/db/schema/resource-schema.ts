import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";

export const resource = sqliteTable("resource", {
    id: text("id").primaryKey().$defaultFn(() => ulid()),
    title: text("title").notNull(),
    description: text("description"),
    filePath: text("file_path").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(new Date(Date.now())),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(new Date(Date.now())),
});

export const resourceRelations = relations(resource, ({}) => ({
    // Define relations here if needed
}));

export type Resource = typeof resource.$inferSelect;
export type NewResource = typeof resource.$inferInsert;