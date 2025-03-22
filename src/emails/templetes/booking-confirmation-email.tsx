import {
    Heading,
    Hr,
    Link,
    Section,
    Text
} from "@react-email/components";
import React from "react";
import { EmailLayout } from "../components/layout";

type BookingConfirmationEmailProps = {
    ctx: {
        client: {
            name: string;
        };
        sessionType: string;
        sessionDateTime: string;
        link?: string;
    };
    subject: string;
};

export const BookingConfirmationEmail: React.FC<Readonly<BookingConfirmationEmailProps>> = ({ ctx }) => {

    return (
        <EmailLayout previewText="Your appointment is confirmed!">
            <Heading className="text-xl font-normal mb-4">Hello {ctx?.client?.name || "User"},</Heading>
            <Text>Your session is confirmed, and we couldn’t be happier to welcome you. 🌟 Seeking support is an act of strength, and we’re honored to be part of your journey.</Text>

            <Section className="my-6">
                <Text className="text-lg font-bold">📅 Session Details:</Text>
                <Text>📌 Session Type: {ctx?.sessionType}</Text>
                <Text>🧑‍⚕️ Therapist: Srishti Singh</Text>
                <Text>📍 Mode: Online</Text>
                <Text>⏳ Date & Time: {ctx?.sessionDateTime}</Text>
                <Text className="mt-4">🔗 <Link href={ctx?.link || "https://meet.google.com/qhd-iwmg-yen"}>This is the link to join the session</Link></Text>
            </Section>

            <Text>If you have any thoughts, questions, or simply want to share anything before our session, don’t hesitate to reach out. You’re in a safe space here.</Text>

            <Hr className="my-6" />

            <Heading className="text-lg font-bold">💡 Need to Reschedule?</Heading>
            <Text>We understand that life can bring sudden urgencies. You can reschedule your session 24 hours prior to its scheduled time by following these steps:</Text>
            <Text className="mt-2">1. Log in to your account (if not already).</Text>
            <Text>2. Go to the Dashboard.</Text>
            <Text>3. Find the Bookings section.</Text>
            <Text>4. Click on the Schedule button to reschedule your session.</Text>

            <Text className="mt-4">We&apos;re here to make the process easy and supportive. See you soon! 💙</Text>

        </EmailLayout>
    );
};

export default BookingConfirmationEmail;
