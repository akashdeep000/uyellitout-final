import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ulid } from "ulid";
import { user } from "./auth-schema";

export const quiz = sqliteTable("quiz", {
    id: text("id").primaryKey().$defaultFn(() => ulid()),
    title: text("title").notNull(),
    defaultMarks: text("default_mark", { mode: "json" }).$type<number[]>().notNull(),
    grades: text("grades", { mode: "json" }).$type<{
        percent: number;
        title: string;
        description: string;
        tips: {
            title: string;
            description: string;
            image: string;
        }[]
    }[]>().notNull(),
    active: integer("active", { mode: "boolean" }).notNull().default(true),
    categoryId: text("category_id").notNull().references(() => quizCategory.id),
});

export const quizCategory = sqliteTable("quiz_category", {
    id: text("id").primaryKey().$defaultFn(() => ulid()),
    name: text("name").notNull(),
    relatedTo: text("related_to", { enum: ["happiness", "intimacy"] }).notNull(),
});

export const question = sqliteTable("question", {
    id: text("id").primaryKey().$defaultFn(() => ulid()),
    question: text("question").notNull(),
    options: text("options", { mode: "json" }).$type<string[]>().notNull(),
    quizId: text("quiz_id").notNull().references(() => quiz.id, { onDelete: "cascade" }),
});

export const quizResult = sqliteTable("quiz_result", {
    id: text("id").primaryKey().$defaultFn(() => ulid()),
    quizId: text("quiz_id").notNull().references(() => quiz.id, { onDelete: "set null" }),
    quizName: text("quiz_name").notNull(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const quizResultAnswer = sqliteTable("quiz_result_answer", {
    id: text("id").primaryKey().$defaultFn(() => ulid()),
    quizResultId: text("quiz_result_id").notNull().references(() => quizResult.id, { onDelete: "cascade" }),
    questionId: text("question_id").notNull().references(() => question.id, { onDelete: "set null" }),
    question: text("question").notNull(),
    option: text("option").notNull(),
});