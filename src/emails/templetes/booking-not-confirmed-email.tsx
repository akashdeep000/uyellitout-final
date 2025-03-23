import { formatToIndianTime } from "@/lib/utils";
import {
    Button,
    Heading,
    Section,
    Text
} from "@react-email/components";
import React from "react";
import { EmailLayout } from "../components/layout";

type BookingNotConfirmedEmailProps = {
    ctx: {
        client: {
            name: string;
        };
        sessionType: string;
        sessionDateTime: Date;
    };

    subject: string;
};

export const BookingNotConfirmedEmail: React.FC<Readonly<BookingNotConfirmedEmailProps>> = ({ ctx }) => {

    return (
        <EmailLayout previewText="Your booking is not confirmed">
            <Heading className="text-xl font-normal mb-4">Hello {ctx?.client?.name || "User"},</Heading>
            <Text>We regret to inform you that your booking could not be confirmed. 😔</Text>
            <Text className="mt-4">Your payment will be refunded within the next 5 business days. If you have any concerns or questions, feel free to contact us.</Text>


            <Section className="my-6">
                <Text className="text-lg font-bold">📅 Session Details:</Text>
                <Text>📌 Session Type: {ctx.sessionType}</Text>
                <Text>⏳ Date & Time: {formatToIndianTime(ctx.sessionDateTime)} (in IST)</Text>
            </Section>

            <Section className="mt-6 mb-4">
                <Text className="text-lg">Would you like to book another session?</Text>
                <Button className="block p-3 bg-emerald-500 text-white text-center mt-2" href="/dashboard/book-a-session">Book Again</Button>
            </Section>
        </EmailLayout>
    );
};

export default BookingNotConfirmedEmail;
