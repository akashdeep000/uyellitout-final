import { VerificationEmail } from "@/emails/templetes/verification-email";
import { sendEmail } from "@/lib/email-client";
import { render } from "@react-email/components";
import { User } from "better-auth";
import BookingCancelledEmail from "./templetes/booking-cancel-email";
import BookingConfirmationEmail from "./templetes/booking-confirmation-email";
import BookingNotConfirmedEmail from "./templetes/booking-not-confirmed-email";
import BookingRescheduledEmail from "./templetes/booking-rescheduled-email";

type VerificationEmail = {
    ctx: {
        user: {
            email: string; // Keep email as required
        } & {
            [K in keyof Omit<User, "email">]?: User[K]; // Make other fields optional
        };
        url: string;
        token: string;
    };
    subject: string;
}

export const sendVerificationEmail: (ctx: VerificationEmail) => Promise<void> = async ({ ctx, subject }) => {

    const emailHtml = await render(<VerificationEmail ctx={ctx} subject={subject} />);

    await sendEmail({
        to: ctx.user.email,
        subject,
        body: emailHtml,
    });
};


type BookingConfirmationEmailProps = {
    ctx: {
        client: {
            name: string;
            email: string;
        };
        sessionType: string;
        sessionDateTime: string;
        link?: string;
    };
    subject: string;
};
export const sendBookingConfirmationEmail: (ctx: BookingConfirmationEmailProps) => Promise<void> = async ({ ctx, subject }) => {

    const emailHtml = await render(<BookingConfirmationEmail ctx={ctx} subject={subject} />);

    await sendEmail({
        to: ctx.client.email,
        subject,
        body: emailHtml,
    });
};



type BookingNotConfirmedEmailProps = {
    ctx: {
        client: {
            name: string;
            email: string;
        };
        sessionType: string;
        sessionDateTime: string;
    };
    subject: string;
};

export const sendBookingNotConfirmedEmail: (ctx: BookingNotConfirmedEmailProps) => Promise<void> = async ({ ctx, subject }) => {

    const emailHtml = await render(<BookingNotConfirmedEmail ctx={ctx} subject={subject} />);

    await sendEmail({
        to: ctx.client.email,
        subject,
        body: emailHtml,
    });
};


type BookingRescheduledEmailProps = {
    ctx: {
        client: {
            name: string;
            email: string;
        };
        sessionType: string;
        oldSessionDateTime: string;
        newSessionDateTime: string;
        link?: string;
    };
    subject: string;
};

export const sendBookingRescheduledEmail: (ctx: BookingRescheduledEmailProps) => Promise<void> = async ({ ctx, subject }) => {

    const emailHtml = await render(<BookingRescheduledEmail ctx={ctx} subject={subject} />);

    await sendEmail({
        to: ctx.client.email,
        subject,
        body: emailHtml,
    });
};


type BookingCancelledEmailProps = {
    ctx: {
        client: {
            name: string;
            email: string;
        };
        sessionType: string;
        sessionDateTime: string;
        reason?: string;
    };
    subject: string;
};

export const sendBookingCancelledEmail: (ctx: BookingCancelledEmailProps) => Promise<void> = async ({ ctx, subject }) => {

    const emailHtml = await render(<BookingCancelledEmail ctx={ctx} subject={subject} />);

    await sendEmail({
        to: ctx.client.email,
        subject,
        body: emailHtml,
    });
};