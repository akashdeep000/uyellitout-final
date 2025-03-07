import { VerificationEmail } from "@/emails/templetes/verification-email";
import { sendEmail } from "@/lib/email-client";
import { render } from "@react-email/components";
import { User } from "better-auth";

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
