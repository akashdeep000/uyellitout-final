import { sendWahaMessage } from "@/actions/waha";
import { VerificationEmail } from "@/emails/templetes/verification-email";
import { sendEmail } from "@/lib/email-client";
import { formatToIndianTime } from "@/lib/utils";
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
            number?: string;
        };
        sessionType: string;
        sessionDateTime: Date;
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
    if (ctx.client.number) {
        try {
            await sendWahaMessage(ctx.client.number,
                `✅ Session Confirmed!

Hello ${ctx.client.name || "User"},

Your therapy session is successfully scheduled.

📅 Date: ${formatToIndianTime(ctx.sessionDateTime).split("at")[0].trim()}
⏰ Time: ${formatToIndianTime(ctx.sessionDateTime).split("at")[1].trim()} (in IST)
🔗 Session Link: https://meet.google.com/qhd-iwmg-yen

We’re here to listen and support you—see you soon!

-Team Uyellitout`);
        } catch (error) {
            console.log(error);

        }
    }
};



type BookingNotConfirmedEmailProps = {
    ctx: {
        client: {
            name: string;
            email: string;
            number?: string;
        };
        sessionType: string;
        sessionDateTime: Date;
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
    if (ctx.client.number) {
        try {
            await sendWahaMessage(ctx.client.number,
                `❌ Session can't be confirm

Hello ${ctx.client.name || "User"},

Your therapy session is canceled due to slot unavaibility.

📅 Date: ${formatToIndianTime(ctx.sessionDateTime).split("at")[0].trim()}
⏰ Time: ${formatToIndianTime(ctx.sessionDateTime).split("at")[1].trim()} (in IST)

If you have been charged, refund will be initiated automatically.
Please chose a different time ans schedule again.

We’re here to listen and support you—see you soon!

-Team Uyellitout`);
        } catch (error) {
            console.log(error);

        }
    }

};


type BookingRescheduledEmailProps = {
    ctx: {
        client: {
            name: string;
            email: string;
            number?: string;
        };
        sessionType: string;
        oldSessionDateTime: Date;
        newSessionDateTime: Date;
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
    if (ctx.client.number) {
        try {
            await sendWahaMessage(ctx.client.number,
                `🔃 Session Rescheduled!

Hello ${ctx.client.name || "User"},

Your therapy session is successfully rescheduled.

📅 New Date: ${formatToIndianTime(ctx.newSessionDateTime).split("at")[0].trim()}
⏰ New Time: ${formatToIndianTime(ctx.newSessionDateTime).split("at")[1].trim()} (in IST)
🔗 Session Link: https://meet.google.com/qhd-iwmg-yen

We’re here to listen and support you—see you soon!

-Team Uyellitout`);
        } catch (error) {
            console.log(error);

        }
    }
};


type BookingCancelledEmailProps = {
    ctx: {
        client: {
            name: string;
            email: string;
            number?: string;
        };
        sessionType: string;
        sessionDateTime: Date;
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

    await sendEmail({
        to: ctx.client.email,
        subject,
        body: emailHtml,
    });
    if (ctx.client.number) {
        try {
            await sendWahaMessage(ctx.client.number,
                `❌ Session is canceled

Hello ${ctx.client.name || "User"},

Your therapy session is canceled.

📅 Date: ${formatToIndianTime(ctx.sessionDateTime).split("at")[0].trim()}
⏰ Time: ${formatToIndianTime(ctx.sessionDateTime).split("at")[1].trim()} (in IST)

Please contact us if there is you have any query.

We’re here to listen and support you—see you soon!

-Team Uyellitout`);
        } catch (error) {
            console.log(error);

        }
    }
};