"use server";

import { packages, services } from "@/configs/data";
import { db } from "@/db"; // Assuming you have a database instance
import { availability, blockedAvailability, booking } from "@/db/schema";
import { env } from "@/env";
import { auth } from "@/lib/auth";
import { convertDateSlots, convertToDate } from "@/lib/utils";
import { orderSchema } from "@/schema/order";
import { addMinutes } from "date-fns";
import { and, asc, count, desc, eq, gte, InferInsertModel, InferSelectModel, isNotNull, isNull, like, lte, or, SQL } from "drizzle-orm";
import { headers } from "next/headers";
import Razorpay from "razorpay";
import { z } from "zod";

// Define TypeScript types
export type Availability = InferSelectModel<typeof availability>;
export type BlockedAvailability = InferSelectModel<typeof blockedAvailability>;
export type NewBooking = InferInsertModel<typeof booking>;

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

// Get next 30 days upcoming confirmed bookings and pending bookings that are created in last 5min
// export async function getUpcommingBookings() {
//     const session = await auth.api.getSession({
//         headers: await headers()
//     });
//     if (session?.user.role !== "admin") {
//         throw new Error("Not Allowed");
//     };

//     const now = new Date();
//     const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
//     const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

//     const upcomingBookings = await db
//         .select()
//         .from(booking)
//         .where(
//             sql`
//       (
//         (status = 'confirmed' AND date >= ${now.toISOString()} AND date <= ${thirtyDaysLater.toISOString()})
//         OR
//         (status = 'pending' AND created_at >= ${fiveMinutesAgo.toISOString()})
//       )
//     `
//         );
//     return upcomingBookings;
// }



// Get Next 30 days' available days
export async function getNext30DaysAvailableDays() {
    // allow slots after
    const startTime = addMinutes(new Date(Date.now()), 120);


    // Get current date and the date 30 days from now
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day

    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);
    thirtyDaysLater.setHours(23, 59, 59, 999); // Set to end of day

    // Get all weekly availability
    const weeklyAvailability = await db.select().from(availability);

    // Get all blocked dates within the next 30 days
    const blockedDates = await db.select().from(blockedAvailability).where(
        and(
            gte(blockedAvailability.date, today),
            lte(blockedAvailability.date, thirtyDaysLater)
        )
    );
    //Get all confirmed bookings within the next 30 days
    const confirmedBookings = await db.select().from(booking).where(
        and(
            eq(booking.status, "confirmed"),
            gte(booking.date, today),
            lte(booking.date, thirtyDaysLater)
        )
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const fixedConfirmedBooking = convertDateSlots(confirmedBookings, 0, 0);

    // Create an array to hold all dates in the next 30 days
    const next30Days = [];
    for (let i = 0; i < 30; i++) {
        const date = new Date(today.toISOString().split("T")[0]);
        date.setDate(today.getDate() + i);
        next30Days.push(date);
    }


    // Map day numbers to day names used in your schema
    const dayMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    // Create the final availability result
    const result = next30Days.map(date => {
        const dayName = dayMap[date.getDay()];
        // console.log({
        //     date: date.toISOString(),
        //     dayName,
        // });

        // Get the weekly schedule for this day
        const daySchedule = weeklyAvailability.find(a => a.day === dayName);
        if (!daySchedule || !daySchedule.slots.length) {
            return {
                date: date,
                slots: []
            };
        }

        // Find if this specific date has blocked slots
        const blockedDate = blockedDates.find(b => {
            const blockedDateTime = b.date;
            return blockedDateTime.toISOString().split("T")[0] = date.toISOString().split("T")[0];
        });

        // console.log({ blockedDates, blockedDate, data: date.getTime() });


        // Calculate available slots
        let availableSlots = [...daySchedule.slots];

        if (blockedDate) {
            // Properly remove blocked slots from available slots
            availableSlots = daySchedule.slots.filter(slot =>
                !blockedDate.slots.includes(slot)
            );
        }

        // Filter slots that's time is already passed
        if (date.toISOString().split("T")[0] === today.toISOString().split("T")[0]) {
            availableSlots = availableSlots.filter(slot => {
                const hour = Math.floor(slot / 4);
                const minute = ((slot % 4) * 15);
                const slotStart = new Date(date);
                slotStart.setHours(hour, minute, 0, 0);
                return slotStart > startTime;
            });
        }

        // Filter out slots that are already booked
        const bookedSlots = fixedConfirmedBooking.filter(b => {
            return b.date?.toISOString().split("T")[0] === date.toISOString().split("T")[0];
        }).map(b => b.slots);

        if (bookedSlots) {
            availableSlots = availableSlots.filter(slot => {
                return !bookedSlots.some(booked => booked?.includes(slot));
            });
        }

        return {
            date: date,
            slots: availableSlots
        };
    });
    // console.log(result.filter(day => day.slots.length > 0));
    // console.log(convertDateSlots(result.filter(day => day.slots.length > 0), 0, 330));


    // Filter out days with no available slots
    return result.filter(day => day.slots.length > 0);

}

// Reshedule booking
export async function resheduleBooking({ id, date, startingSlot }: {
    id: string,
    date: Date,
    startingSlot: number
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session?.user.id) {
        throw new Error("Not Allowed");
    };

    await checkIfSlotAvailible(date, startingSlot);
    return await db.update(booking).set({
        date,
        slots: [startingSlot, startingSlot + 1, startingSlot + 2, startingSlot + 3],
        time: convertToDate(date, startingSlot),
        status: "confirmed"
    }).where(and(eq(booking.id, id), session?.user.role !== "admin" ? eq(booking.userId, session.user.id) : undefined)).returning();
}

// Cancel booking
export async function cancelBooking({ id }: {
    id: string
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session?.user.role !== "admin") {
        throw new Error("Not Allowed");
    };
    return await db.update(booking).set({
        status: "cancelled"
    }).where(eq(booking.id, id)).returning();
}

// Get historical bookings of user (latest first) with pagination
export async function getHistoricalBookingsUser({
    page = 1,
    limit = 10,
}: {
    page?: number,
    limit?: number,

}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session?.user.id) {
        throw new Error("Not Allowed");
    }
    const userId = session.user.id;
    return await db.select().from(booking)
        .where(
            and(
                eq(booking.userId, userId),
                or(
                    and(
                        eq(booking.status, "confirmed"),
                        lte(booking.time, new Date())
                    ),
                    eq(booking.status, "cancelled")
                ),

            )
        )
        .orderBy(desc(booking.createdAt))
        .offset((page - 1) * limit)
        .limit(limit);
}

// Get confirmed booking that are not sheduled of user
export async function getNotSheduledBookingsUser() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session?.user.id) {
        throw new Error("Not Allowed");
    }
    const userId = session.user.id;
    return await db.select().from(booking)
        .where(
            and(
                eq(booking.userId, userId),
                eq(booking.status, "confirmed"),
                isNull(booking.time)
            )
        )
        .orderBy(desc(booking.createdAt));
}

// Get upcoming bookings of user
export async function getUpcomingBookingsUser() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session?.user.id) {
        throw new Error("Not Allowed");
    }
    const userId = session.user.id;
    return await db.select().from(booking)
        .where(
            and(
                eq(booking.userId, userId),
                eq(booking.status, "confirmed"),
                gte(booking.time, new Date())
            ),
        )
        .orderBy(asc(booking.date));
}

// Get all bookings (latest first) with pagination
export async function getBookings({
    page = 1,
    limit = 10,
    from,
    to,
    createdFrom,
    createdTo,
    sortBy = "time",
    onlyScheduled = "false",
    search = ""
}: {
    page?: number,
    limit?: number,
    from?: Date,
    to?: Date,
    createdFrom?: Date,
    createdTo?: Date,
    sortBy?: "createdAt" | "time",
    onlyScheduled?: "true" | "false",
    search?: string
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session?.user.role !== "admin") {
        throw new Error("Not Allowed");
    }

    // Determine which column to sort by
    const sortColumn = sortBy;

    // Build the base where conditions (without pagination cursor)
    const baseWhereConditions = [
        or(eq(booking.status, "confirmed"), eq(booking.status, "cancelled"))
    ];

    if (createdFrom && createdTo && createdFrom < createdTo) {
        baseWhereConditions.push(gte(booking.createdAt, createdFrom));
        baseWhereConditions.push(lte(booking.createdAt, createdTo));
    }

    // Add scheduled-only condition if specified
    if (onlyScheduled === "true") {
        console.log(from, to);

        if (from && to && from < to) {
            baseWhereConditions.push(gte(booking.date, from));
            baseWhereConditions.push(lte(booking.date, to));
        }

        baseWhereConditions.push(isNotNull(booking.time));
    }

    // Add search conditions if search term is provided
    if (search && search.trim() !== "") {
        baseWhereConditions.push(
            or(
                like(booking.name, `%${search.trim()}%`),
                like(booking.email, `%${search.trim()}%`),
                like(booking.phoneNumber, `%${search.trim()}%`)
            ) as SQL<unknown>
        );
    }

    // Get total count matching the criteria (excluding pagination)
    const [{ count: totalCount }] = await db
        .select({ count: count() })
        .from(booking)
        .where(and(...baseWhereConditions));

    // Create pagination conditions by copying base conditions
    const paginationWhereConditions = [...baseWhereConditions];

    // // Add pagination cursor condition if lastId is provided
    // if (lastId) {
    //     paginationWhereConditions.push(lt(booking.id, lastId));
    // }

    // Execute the paginated query
    const results = await db
        .select()
        .from(booking)
        .where(and(...paginationWhereConditions))
        .orderBy(desc(booking[sortColumn]))
        .offset((page - 1) * limit).limit(limit);

    // Get the last ID for the next page cursor
    // const lastBookingId = results.length > 0 ? results[results.length - 1].id : null;

    // Check if there are more results
    const hasNextPage = totalCount > (page * limit);

    return {
        data: results,
        pagination: {
            hasNextPage,
            nextPage: hasNextPage ? page + 1 : null,
            totalCount: Number(totalCount)
        }
    };
}


// Create Rasorpay order
type Modify<T, K extends keyof T, R> = Omit<T, K> & { [P in K]: R };
type FormDataType = Modify<z.infer<typeof orderSchema>, "startingSlot", number | string | undefined>

export async function createRazorpayOrder(data: FormDataType) {
    // safe parse using zod
    const { data: parsedData, success } = orderSchema.safeParse(data);
    if (!success) {
        throw new Error("Invalid data");
    }
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // console.log(availabilities.map(a => ({
    //     date: a.date.toISOString(),
    //     slots: a.slots
    // })));
    // console.log({
    //     date: parsedData.date.toISOString(),
    //     startingSlot: parsedData.startingSlot,
    //     slots: [parsedData.startingSlot, parsedData.startingSlot + 1, parsedData.startingSlot + 2, parsedData.startingSlot + 3]
    // });


    // const availabileSlots = availabilities.find((availability) => availability.date.toISOString().split("T")[0] === parsedData.date.toISOString().split("T")[0])?.slots;
    // if (!availabileSlots) {
    //     throw new Error("No slots available for this date");
    // }
    // const startingSlot = parsedData.startingSlot;

    // if (![startingSlot, startingSlot + 1, startingSlot + 2, startingSlot + 3].every(slot => availabileSlots.includes(slot))) {
    //     throw new Error("Slot not available");
    // }

    // Check if slot available
    await checkIfSlotAvailible(parsedData.date, parsedData.startingSlot);

    // continue if available
    const product = parsedData.productType === "service" ? services[parsedData.productId] : packages[parsedData.productId];

    const razorpay = new Razorpay({
        key_id: env.NEXT_PUBLIC_RASORPAY_KEY_ID,
        key_secret: env.RASORPAY_KEY_SECRET
    });

    const order = await razorpay.orders.create({
        amount: product.price * parsedData.productCount * 100, // amount in the smallest currency unit
        currency: "INR",
        notes: {
            userId: session?.user.id || "",
            productType: parsedData.productType,
            productId: parsedData.productId,
            name: parsedData.name,
            email: parsedData.email,
            phoneNumber: parsedData.phoneNumber,
            age: parsedData.age,
        }
    });
    const newBookings: NewBooking[] = [];
    for (let i = 0; i < parsedData.productCount; i++) {
        newBookings.push({
            userId: session?.user.id || null,
            name: parsedData.name,
            email: parsedData.email,
            phoneNumber: parsedData.phoneNumber,
            orderId: order.id,
            productType: parsedData.productType,
            productName: product.title,
            price: product.price,
            age: parsedData.age,
            status: "pending",
            date: i === 0 ? parsedData.date : null,
            slots: i === 0 ? [parsedData.startingSlot, parsedData.startingSlot + 1, parsedData.startingSlot + 2, parsedData.startingSlot + 3] : null,
            time: i === 0 ? convertToDate(parsedData.date, parsedData.startingSlot) : null,
            message: parsedData.message,
            emergencyContactPerson: parsedData.emergencyContactPerson,
            emergencyContactNumber: parsedData.emergencyContactNumber,
            emergencyContactRelation: parsedData.emergencyContactRelation
        });
    }
    await db.insert(booking).values(newBookings);
    return order;
};


// Check if slot available
export async function checkIfSlotAvailible(date: Date, startingSlot: number) {
    console.log({ date, startingSlot });

    const requestedSlotsArray = convertDateSlots([{
        date: date,
        slots: [startingSlot, startingSlot + 1, startingSlot + 2, startingSlot + 3]
    }], 0, 0);

    console.log(requestedSlotsArray);

    const availabilities = await getNext30DaysAvailableDays();
    console.log(availabilities);

    requestedSlotsArray.forEach(requestedSlots => {
        const availabileSlots = availabilities.find((availability) => availability.date.toISOString().split("T")[0] === requestedSlots.date.toISOString().split("T")[0])?.slots;
        if (!availabileSlots) {
            throw new Error("No slots available for this date");
        };
        console.log({
            a: requestedSlots.slots,
            b: availabileSlots
        });

        if (!requestedSlots.slots.every(slot => availabileSlots.includes(slot))) {
            throw new Error("Slot not available");
        }
    });
}