import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";
import { user } from "./auth-schema";

export const availability = sqliteTable("availability", {
    id: text("id").primaryKey().$defaultFn(() => ulid()),
    day: text("day", { enum: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] }).notNull().unique(),
    slots: text("slots", { mode: "json" }).$type<number[]>(),
    userId: text("user_id").notNull().references(() => user.id)
});

export const blockedAvailability = sqliteTable("blocked_availability", {
    id: text("id").primaryKey().$defaultFn(() => ulid()),
    date: integer("date", { mode: "timestamp" }).notNull().unique(),
    slots: text("slots", { mode: "json" }).$type<number[]>(),
    userId: text("user_id").notNull().references(() => user.id)
});

export const booking = sqliteTable("booking", {
    id: text("id").primaryKey().$defaultFn(() => ulid()),
    date: integer("date", { mode: "timestamp" }).notNull(),
    slot: integer("slot").notNull(),
    userId: text("user_id").notNull().references(() => user.id),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(CURRENT_TIMESTAMP)`).$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});