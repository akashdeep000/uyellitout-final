"use server";

import { db } from "@/db"; // Assuming you have a database instance
import { question, quiz, quizCategory, quizResult, quizResultAnswer } from "@/db/schema";
import { eq, InferInsertModel, InferSelectModel, sql } from "drizzle-orm";

// Define TypeScript types
export type Quiz = InferSelectModel<typeof quiz>;
export type NewQuiz = InferInsertModel<typeof quiz>;
export type Question = InferSelectModel<typeof question>;
export type NewQuestion = InferInsertModel<typeof question>;
export type QuizResult = InferSelectModel<typeof quizResult>;
export type NewQuizResult = InferInsertModel<typeof quizResult>;
export type QuizCategory = InferSelectModel<typeof quizCategory>;
export type NewQuizCategory = InferInsertModel<typeof quizCategory>;
export type QuizResultAnswer = InferSelectModel<typeof quizResultAnswer>;
export type NewQuizResultAnswer = InferInsertModel<typeof quizResultAnswer>;

// Create a new quiz
export async function createQuiz(data: NewQuiz) {
    return await db.insert(quiz).values(data).returning();
}



// Fetch a single quiz by ID
export async function getQuizById(id: string): Promise<Quiz | undefined> {
    const result = await db.select().from(quiz).where(eq(quiz.id, id));
    return result[0];
}

// Fetch all quizzes with total question count
export async function getQuizzes() {
    return await db.select({
        id: quiz.id,
        title: quiz.title,
        defaultMarks: quiz.defaultMarks,
        grades: quiz.grades,
        active: quiz.active,
        categoryId: quiz.categoryId,
        totalQuestions: sql<number>`(SELECT COUNT(*) FROM ${question} WHERE ${question.quizId} = ${quiz.id})`.as("totalQuestions")
    }).from(quiz);
}

// // Fetch quizzes by category
export async function getQuizzesByCategory(categoryId: string) {
    return await db.select({
        id: quiz.id,
        title: quiz.title,
        defaultMarks: quiz.defaultMarks,
        grades: quiz.grades,
        active: quiz.active,
        categoryId: quiz.categoryId,
        totalQuestions: sql<number>`(SELECT COUNT(*) FROM ${question} WHERE ${question.quizId} = ${quiz.id})`.as("totalQuestions")
    }).from(quiz).where(eq(quiz.categoryId, categoryId));
}


// Update a quiz
export async function updateQuiz(id: string, data: Partial<NewQuiz>) {
    const result = await db.update(quiz).set(data).where(eq(quiz.id, id)).returning();
    return result[0];
}

// Delete a quiz
export async function deleteQuiz(id: string) {
    return await db.delete(quiz).where(eq(quiz.id, id)).returning();
}

// Create a new question
export async function createQuestion(data: NewQuestion) {
    return await db.insert(question).values(data).returning();
}

// Create multiple questions by quiz id
export async function createQuestionsByQuiz(quizId: string, questions: NewQuestion[], deletePrevious = false) {
    if (deletePrevious) {
        await db.delete(question).where(eq(question.quizId, quizId));
    }
    const newQuestions = questions.map((question) => ({ ...question, quizId }));
    return await db.insert(question).values(newQuestions).returning();
}

// Fetch questions for a quiz
export async function getQuestionsByQuiz(quizId: string): Promise<Question[]> {
    return await db.select().from(question).where(eq(question.quizId, quizId));
}

// Get a question by id
export async function getQuestionById(id: string) {
    const result = await db.select().from(question).where(eq(question.id, id));
    return result[0];
}

// Update a question
export async function updateQuestion(id: string, data: Partial<NewQuestion>) {
    return await db.update(question).set(data).where(eq(question.id, id)).returning();
}

// Delete a question
export async function deleteQuestion(id: string) {
    return await db.delete(question).where(eq(question.id, id)).returning();
}

// Create a quiz result
export async function createQuizResult(data: NewQuizResult) {
    return await db.insert(quizResult).values(data).returning();
}

// Fetch all quiz results
export async function getAllQuizResults(): Promise<QuizResult[]> {
    return await db.select().from(quizResult);
}

// Fetch quiz results for a user
export async function getQuizResults(userId: string): Promise<QuizResult[]> {
    return await db.select().from(quizResult).where(eq(quizResult.userId, userId));
}

// Delete a quiz result
export async function deleteQuizResult(id: string) {
    return await db.delete(quizResult).where(eq(quizResult.id, id)).returning();
}

// Create a quiz result answer
export async function createQuizResultAnswer(data: NewQuizResultAnswer) {
    return await db.insert(quizResultAnswer).values(data).returning();
}

// Fetch all quiz result answers for a result
export async function getQuizResultAnswers(quizResultId: string): Promise<QuizResultAnswer[]> {
    return await db.select().from(quizResultAnswer).where(eq(quizResultAnswer.quizResultId, quizResultId));
}

// Create a new category
export async function addCategory(data: NewQuizCategory) {
    return await db.insert(quizCategory).values(data).returning();
}

// Fetch all categories
export async function getCategories(): Promise<QuizCategory[]> {
    return await db.select().from(quizCategory);
}

// Update a category
export async function updateCategory(id: string, name: string) {
    return await db.update(quizCategory).set({ name }).where(eq(quizCategory.id, id)).returning();
}

// Delete a category
export async function deleteCategory(id: string) {
    return await db.delete(quizCategory).where(eq(quizCategory.id, id)).returning();
}
