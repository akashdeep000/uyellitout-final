import { formatToIndianTime } from "@/lib/utils";
import {
    Heading,
    Link,
    Section,
    Text
} from "@react-email/components";
import React from "react";
import { EmailLayout } from "../components/layout";

type BookingRescheduledEmailProps = {
    ctx: {
        client: {
            name: string;
        };
        sessionType: string;
        oldSessionDateTime: Date;
        newSessionDateTime: Date;
        link?: string;
    };
    subject: string;
};

export const BookingRescheduledEmail: React.FC<Readonly<BookingRescheduledEmailProps>> = ({ ctx }) => {

    return (
        <EmailLayout previewText="Your appointment has been rescheduled">
            <Heading className="text-xl font-normal mb-4">Hello {ctx?.client?.name || "User"},</Heading>
            <Text>Your session has been successfully rescheduled. We appreciate your flexibility and are here to support you on your journey. 🌟</Text>

            <Section className="my-6">
                <Text className="text-lg font-bold">📅 Updated Session Details:</Text>
                <Text>📌 Session Type: {ctx?.sessionType}</Text>
                <Text>🧑‍⚕️ Therapist: Srishti Singh</Text>
                <Text>📍 Mode: Online</Text>
                <Text>⏳ Previous Date & Time: {formatToIndianTime(ctx.oldSessionDateTime)} (in IST)</Text>
                <Text>⏳ New Date & Time: {formatToIndianTime(ctx.newSessionDateTime)} (in IST)</Text>
                <Text className="mt-4">🔗 <Link href={ctx?.link || "https://meet.google.com/qhd-iwmg-yen"}>Join the session</Link></Text>
            </Section>

            <Text>If you have any thoughts, questions, or simply want to share anything before our session, don’t hesitate to reach out. You’re in a safe space here.</Text>

        </EmailLayout>
    );
};

export default BookingRescheduledEmail;
