import { sendVerificationEmail } from "@/emails";
import { env } from "@/env";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, magicLink, phoneNumber } from "better-auth/plugins";
import { db } from "../db/index"; // your drizzle instance

const socialProviders: BetterAuthOptions["socialProviders"] = {};

// Check if both GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are defined
if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
    socialProviders.google = {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
    };
}

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
    }),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60 // Cache duration in seconds
        }
    },
    emailVerification: {
        sendVerificationEmail: async (ctx) => {
            await sendVerificationEmail({ ctx, subject: "Please verify your email address." });
        }
    },
    plugins: [
        nextCookies(),
        admin(),
        phoneNumber(),
        magicLink({
            sendMagicLink: async (ctx) => {
                await sendVerificationEmail({
                    ctx: {
                        ...ctx,
                        user: {
                            email: ctx.email

                        }
                    },
                    subject: "Plese verify your email address."
                });
            }
        })
    ],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async (ctx) => {
            await sendVerificationEmail({ ctx, subject: "Reset your password." });
        }
    },
    socialProviders
});