"use server";

import { db } from "@/db"; // Assuming you have a database instance
import { question, quiz, quizCategory, quizResult, quizResultAnswer, user, userStat } from "@/db/schema";
import { auth } from "@/lib/auth";
import { converterToHappiness } from "@/lib/utils";
import { count, desc, eq, InferInsertModel, InferSelectModel, like, or } from "drizzle-orm";
import { headers } from "next/headers";

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
export async function getQuizById(id: string) {
    const result = await db.select({
        id: quiz.id,
        title: quiz.title,
        defaultMarks: quiz.defaultMarks,
        grades: quiz.grades,
        active: quiz.active,
        categoryId: quiz.categoryId,
        categoryName: quizCategory.name
    }).from(quiz).where(eq(quiz.id, id)).leftJoin(quizCategory, eq(quiz.categoryId, quizCategory.id));
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
        totalQuestions: count(question.id)
    })
        .from(quiz)
        .leftJoin(question, eq(question.quizId, quiz.id))
        .groupBy(quiz.id, quiz.title, quiz.defaultMarks, quiz.grades, quiz.active, quiz.categoryId);

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
        totalQuestions: count(question.id)
    })
        .from(quiz).where(eq(quiz.categoryId, categoryId))
        .leftJoin(question, eq(question.quizId, quiz.id))
        .groupBy(quiz.id, quiz.title, quiz.defaultMarks, quiz.grades, quiz.active, quiz.categoryId);
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

// Get quiz result with quiz details by id
export async function getQuizResultById(id: string) {
    return (await db.select({
        id: quizResult.id,
        quizId: quizResult.quizId,
        userId: quizResult.userId,
        createdAt: quizResult.createdAt,
        quizName: quizResult.quizName,
        mark: quizResult.mark,
        total: quizResult.total,
        quiz: quiz,
    }).from(quizResult)
        .where(eq(quizResult.id, id))
        .leftJoin(quiz, eq(quizResult.quizId, quiz.id)))[0];
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
export async function updateCategory(id: string, data: { name: string; relatedTo: "happiness" | "anxiety" | "stress" | "mood" | "intimacy" | "others" }) {
    return await db.update(quizCategory).set({ name: data.name, relatedTo: data.relatedTo }).where(eq(quizCategory.id, id)).returning();
}

// Delete a category
export async function deleteCategory(id: string) {
    return await db.delete(quizCategory).where(eq(quizCategory.id, id)).returning();
}

// Submit quiz
export async function submitQuiz(data: {
    quizId: string;
    answers: {
        questionId: string;
        answerIndex: number;
    }[];
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.session?.userId;
    if (!userId) {
        throw new Error("User not found");
    };
    const quizData = (await db.select({
        title: quiz.title,
        defaultMarks: quiz.defaultMarks,
        categoryId: quiz.categoryId,
        categoryName: quizCategory.name,
        categotyRelatedTo: quizCategory.relatedTo
    }).from(quiz).where(eq(quiz.id, data.quizId)).leftJoin(quizCategory, eq(quiz.categoryId, quizCategory.id)))[0];

    if (!quizData) {
        throw new Error("Quiz not found");
    }

    const questions = await getQuestionsByQuiz(data.quizId);
    const userStatData = await db.select().from(userStat).where(eq(userStat.userId, userId));

    const defaultMarks = quizData.defaultMarks;

    let mark = 0;
    const quizResultAnswers: NewQuizResultAnswer[] = [];
    const total = data.answers.length * defaultMarks.toSorted((a, b) => b - a)[0];

    for (const answer of data.answers) {
        mark += defaultMarks[answer.answerIndex];
        const question = questions.find((question) => question.id = answer.questionId);
        if (question) {
            quizResultAnswers.push({
                question: question.question,
                option: question.options[answer.answerIndex] as string,
                questionId: question.id,
                quizResultId: "dummy"
            });
        }
    }
    const percentage = (mark / total) * 100;
    const quizResultData = await db.insert(quizResult).values({
        quizName: quizData.title,
        quizId: data.quizId,
        userId,
        mark,
        total
    }).returning();
    const quizResultId = quizResultData[0].id;
    const newQuizResultAnswers = quizResultAnswers.map((answer) => ({ ...answer, quizResultId }));
    console.log({ mark, total, percentage, quizData });

    await db.insert(quizResultAnswer).values(newQuizResultAnswers);

    if (quizData.categotyRelatedTo !== "others") {
        const stat = userStatData[0]?.stat ?? [];
        const previousStat = stat[stat.length - 1] || {
            happiness: 0,
            intimacy: 0
        };

        const newStat = {
            happiness: quizData.categotyRelatedTo === "intimacy" ? previousStat.happiness || 0 : converterToHappiness(quizData.categotyRelatedTo, (previousStat.happiness === 0 ? percentage || 7 : (previousStat.happiness + percentage) / 2)),
            intimacy: quizData.categotyRelatedTo !== "intimacy" ? previousStat.intimacy || 0 : previousStat.intimacy === 0 ? percentage || 0 : (previousStat.intimacy + percentage) / 2
        };

        if (newStat.happiness > 97) {
            newStat.happiness = 97;
        }
        if (newStat.intimacy > 97) {
            newStat.intimacy = 97;
        }

        if (newStat.happiness !== 0 && newStat.happiness < 7) {
            newStat.happiness = 7;
        }
        if (newStat.intimacy !== 0 && newStat.intimacy < 7) {
            newStat.intimacy = 7;
        }

        if (userStatData.length === 0) {
            await db.insert(userStat).values({
                stat: [newStat],
                userId
            });
        } else if (stat.length < 3) {
            await db.update(userStat).set({
                stat: [...stat, newStat]
            }).where(eq(userStat.userId, userId));
        } else {
            if (stat.length >= 3) {
                stat[1] = stat[2];
                stat.pop();
            }
            await db.update(userStat).set({
                stat: [...stat, newStat]
            }).where(eq(userStat.userId, userId));
            return { id: quizResultId, percentage };
        }
    }
    return { id: quizResultId, percentage };
}

// Get quiz results with user details (latest first)
export async function getQuizResultsWithUser(page: number = 1, limit: number = 10, search?: string) {
    const offset = (page - 1) * limit;

    let query = db.select({
        id: quizResult.id,
        quizName: quizResult.quizName,
        quizId: quizResult.quizId,
        userId: quizResult.userId,
        mark: quizResult.mark,
        total: quizResult.total,
        createdAt: quizResult.createdAt,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            image: user.image
        }
    }).from(quizResult)
        .innerJoin(user, eq(user.id, quizResult.userId))
        .orderBy(desc(quizResult.createdAt));

    if (search) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        query = query.where(
            or(
                like(user.name, `%${search}%`),
                like(user.email, `%${search}%`)
            )
        );
    }

    const [results, totalCount] = await Promise.all([
        query.limit(limit).offset(offset),
        db.select({ count: count() })
            .from(quizResult)
            .then(result => Number(result[0].count))
    ]);

    return {
        results,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page
    };
}

// Get quiz results by user
export async function getQuizResultsByUser() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.session?.userId;
    if (!userId) {
        throw new Error("User not found");
    };
    return await db.select().from(quizResult).where(eq(quizResult.userId, userId)).orderBy(desc(quizResult.createdAt));
}

// Get stats by user
export async function getStatsByUser() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.session?.userId;
    if (!userId) {
        throw new Error("User not found");
    };
    return (await db.select().from(userStat).where(eq(userStat.userId, userId)).orderBy(desc(userStat.createdAt)))[0];
}


// get recomended quiz
export async function getRecomendedQuiz(current: string) {
    const quizzes = await db.select({
        id: quiz.id,
        title: quiz.title,
        category: quiz.categoryId,
    }).from(quiz);

    const currentQuiz = quizzes.find(q => q.id === current);

    let sameCatQuizzes = quizzes.filter(q => q.category === currentQuiz?.category && q.id !== currentQuiz?.id);
    let diffCatQuizzes = quizzes.filter(q => q.category !== currentQuiz?.category);

    if (!currentQuiz) {
        sameCatQuizzes = quizzes.filter(q => q.id !== current);
        diffCatQuizzes = quizzes.filter(q => q.id !== current);
    }

    if (sameCatQuizzes.length === 0) {
        return {
            sameCatQuiz: null,
            diffCatQuiz: diffCatQuizzes[Math.floor(Math.random() * diffCatQuizzes.length)]
        };
    }
    if (diffCatQuizzes.length === 0) {
        return {
            sameCatQuiz: sameCatQuizzes[Math.floor(Math.random() * sameCatQuizzes.length)],
            diffCatQuiz: null
        };
    };
    if (sameCatQuizzes.length === 0 && diffCatQuizzes.length === 0) {
        return {
            sameCatQuiz: null,
            diffCatQuiz: null
        };
    };

    return {
        sameCatQuiz: sameCatQuizzes[Math.floor(Math.random() * sameCatQuizzes.length)],
        diffCatQuiz: diffCatQuizzes[Math.floor(Math.random() * diffCatQuizzes.length)]
    };
}