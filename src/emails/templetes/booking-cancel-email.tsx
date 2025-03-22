import {
    Heading,
    Section,
    Text
} from "@react-email/components";
import React from "react";
import { EmailLayout } from "../components/layout";

type BookingCancelledEmailProps = {
    ctx: {
        client: {
            name: string;
        };
        sessionType: string;
        sessionDateTime: string;
        reason?: string;
    };
    subject: string;
};

export const BookingCancelledEmail: React.FC<Readonly<BookingCancelledEmailProps>> = ({ ctx }) => {

    return (
        <EmailLayout previewText="Your appointment has been cancelled">
            <Heading className="text-xl font-normal mb-4">Hello {ctx?.client?.name || "User"},</Heading>
            <Text>We regret to inform you that your session has been cancelled. We sincerely apologize for any inconvenience this may have caused.</Text>

            <Section className="my-6">
                <Text className="text-lg font-bold">📅 Cancelled Session Details:</Text>
                <Text>📌 Session Type: {ctx?.sessionType}</Text>
                <Text>⏳ Scheduled Date & Time: {ctx?.sessionDateTime}</Text>
                {ctx?.reason && (
                    <Text>💬 Reason for Cancellation: {ctx.reason}</Text>
                )}
            </Section>

            <Text>For further assistance or to reschedule, please feel free to contact us. We are here to help you. 💙</Text>
        </EmailLayout>
    );
};

export default BookingCancelledEmail;
