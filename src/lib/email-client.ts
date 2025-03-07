import { env } from "@/env";
import nodemailer from "nodemailer";

// Create a transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD
    }
});

// Function to send an email
export const sendEmail = async (ctx: {
    to: string,
    subject: string,
    body: string
}) => {
    const mailOptions = {
        from: env.SMTP_FROM,
        to: ctx.to,
        subject: ctx.subject,
        text: ctx.body
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};