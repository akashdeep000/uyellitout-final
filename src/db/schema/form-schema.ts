import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";
import { user } from "./auth-schema";

export const formSubmission = sqliteTable("form_submission", {
    id: text("id").primaryKey().$defaultFn(() => ulid()),
    formName: text("form_name").notNull(),
    userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
    data: text("data", { mode: "json" }).$type<Record<string, string | number | undefined>>(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(new Date(Date.now())),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(new Date(Date.now())),
});