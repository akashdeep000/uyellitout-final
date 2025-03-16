import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";
import { user } from "./auth-schema";

export const availability = sqliteTable("availability", {
    id: text("id").primaryKey().$defaultFn(() => ulid()),
    day: text("day", { enum: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] }).notNull().unique(),
    slots: text("slots", { mode: "json" }).$type<number[]>().notNull(),
});

export const blockedAvailability = sqliteTable("blocked_availability", {
    id: text("id").primaryKey().$defaultFn(() => ulid()),
    date: integer("date", { mode: "timestamp" }).notNull().unique(),
    slots: text("slots", { mode: "json" }).$type<number[]>().notNull(),
});

export const booking = sqliteTable("booking", {
    id: text("id").primaryKey().$defaultFn(() => ulid()),
    date: integer("date", { mode: "timestamp" }),
    slots: text("slots", { mode: "json" }).$type<number[]>(),
    time: integer("time", { mode: "timestamp" }),
    status: text("status", { enum: ["pending", "confirmed", "cancelled"] }).notNull().default("pending"),
    userId: text("user_id").references(() => user.id),
    orderId: text("order_id").notNull(),
    productName: text("product_name").notNull(),
    productType: text("product_type", { enum: ["service", "package"] }).notNull(),
    price: integer("price").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phoneNumber: text("phone_number").notNull(),
    age: integer("age").notNull(),
    message: text("message"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(new Date(Date.now())),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(new Date(Date.now())),
});