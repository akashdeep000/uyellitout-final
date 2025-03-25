import { checkIfSlotAvailible } from "@/actions/booking";
import { db } from "@/db";
import { booking } from "@/db/schema";
import { sendBookingConfirmationEmail, sendBookingNotConfirmedEmail } from "@/emails";
import { env } from "@/env";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Replace with your Razorpay Secret Key
const RAZORPAY_SECRET = env.RASORPAY_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
    try {
        // Get the raw body from the request
        const rawBody = await request.text();
        const signature = request.headers.get("x-razorpay-signature") as string;

        if (!signature) {
            return NextResponse.json({ error: "Signature missing" }, { status: 400 });
        }

        // Generate the expected signature
        const expectedSignature = crypto
            .createHmac("sha256", RAZORPAY_SECRET)
            .update(rawBody)
            .digest("hex");

        // Compare signatures
        if (signature !== expectedSignature) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        // Parse the body as JSON
        const payload = JSON.parse(rawBody);

        // Handle the event type
        switch (payload.event) {
            // case "payment.captured":
            //     // Handle successful payment capture
            //     console.log("Payment captured:", payload);
            //     break;
            case "order.paid":
                let bookings;
                try {
                    // Handle successful order payment
                    console.log("Order paid:", payload);
                    // Update the booking status to "confirmed" in the database
                    const orderId = payload.payload.order.entity.id;
                    console.log("Order ID:", orderId);
                    bookings = await db.select().from(booking).where(eq(booking.orderId, orderId));
                    if (bookings.length === 0) {
                        throw new Error("No booking found");
                    }

                    // const availabilities = await getNext30DaysAvailableDays();

                    for (const booking of bookings) {
                        if (booking.date && booking.slots) {
                            await checkIfSlotAvailible(booking.date, booking.slots[0]);
                            // const availabileSlots = availabilities.find((availability) => availability.date.toISOString().split("T")[0] === booking.date?.toISOString().split("T")[0])?.slots;
                            // if (!availabileSlots) {
                            //     throw new Error("No slots available for this date");
                            // }
                            // if (booking.slots) {
                            //     if (!booking.slots.every(slots => availabileSlots.includes(slots))) {
                            //         throw new Error("No slots available for this date");
                            //     }
                            // }
                        }
                    }
                    await db.update(booking)
                        .set({ status: "confirmed" })
                        .where(eq(booking.orderId, orderId));
                    await sendBookingConfirmationEmail({
                        subject: "Uyellitout - Session Booking Confirmed",
                        ctx: {
                            client: {
                                email: bookings[0].email,
                                name: bookings[0].name,
                                number: bookings[0].phoneNumber
                            },
                            sessionType: bookings[0].productName,
                            sessionDateTime: bookings[0].time!
                        }
                    });
                } catch (error) {
                    console.log(error);
                    if (!bookings) return;
                    try {
                        await sendBookingNotConfirmedEmail({
                            subject: "Uyellitout - Session Booking Not Confirmed",
                            ctx: {
                                client: {
                                    email: bookings[0].email,
                                    name: bookings[0].name,
                                    number: bookings[0].phoneNumber
                                },
                                sessionType: bookings[0].productName,
                                sessionDateTime: bookings[0].time!
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
                break;
            default:
                console.log("Unhandled event type:", payload.event);
        }

        // Respond with success
        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("Error processing webhook:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}