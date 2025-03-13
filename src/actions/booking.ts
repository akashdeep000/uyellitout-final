"use server";

import { db } from "@/db"; // Assuming you have a database instance
import { availability, blockedAvailability } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, InferSelectModel } from "drizzle-orm";
import { headers } from "next/headers";

// Define TypeScript types
export type Availability = InferSelectModel<typeof availability>;
export type BlockedAvailability = InferSelectModel<typeof blockedAvailability>;

// Get availabile slots
export async function getAvailabilities() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (session?.user.role !== "admin") {
        throw new Error("Not Allowed");
    };

    const availabilities = await db.select().from(availability);
    if (availabilities.length !== 0) {
        return availabilities;
    }
    const missingAvailabilities = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map(day => ({
        day: day as "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat",
        slots: []
    }));
    return await db.insert(availability).values(missingAvailabilities).returning();
}

// Update many availability
export async function updateAvailabilities(data: Partial<Availability>[]) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (session?.user.role !== "admin") {
        throw new Error("Not Allowed");
    };
    return await db.transaction(async (trx) => {
        for (const d of data) {
            if (!d.day) continue;
            await trx.update(availability)
                .set(d)
                .where(eq(availability.day, d.day));
        }
    });
}

// Get blocked slots
export async function getBlockedSlots() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (session?.user.role !== "admin") {
        throw new Error("Not Allowed");
    };

    return await db.select().from(blockedAvailability);
}

// Create or update blocked slot
export async function createOrUpdateBlockedSlot(data: Partial<BlockedAvailability>[]) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (session?.user.role !== "admin") {
        throw new Error("Not Allowed");
    };

    return await db.transaction(async (trx) => {
        for (const d of data) {
            if (!d.date || !d.slots) continue;
            return await trx.insert(blockedAvailability)
                .values({
                    date: d.date,
                    slots: d.slots
                })
                .onConflictDoUpdate({
                    target: [blockedAvailability.date],
                    set: d
                }).returning();
        }
    });
}

// Delete all blocked slots and add new slots
export async function deleteAllBlockedSlotsAndAddNew(data: Partial<BlockedAvailability>[]) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (session?.user.role !== "admin") {
        throw new Error("Not Allowed");
    };

    return await db.transaction(async (trx) => {
        await trx.delete(blockedAvailability);
        for (const d of data) {
            if (!d.date || !d.slots) continue;
            await trx.insert(blockedAvailability)
                .values({
                    date: d.date,
                    slots: d.slots
                });
        }
    });
}
