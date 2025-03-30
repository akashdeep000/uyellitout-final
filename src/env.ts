/* eslint-disable n/no-process-env */
import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z, ZodError } from "zod";

// Load environment variables from .env file
expand(config());

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "staging", "production"]),
    BETTER_AUTH_SECRET: z.string().min(1), // Secret for authentication
    DATABASE_URL: z.string().url(), // Database connection URL
    DATABASE_TOKEN: z.string().optional(),
    DB_MIGRATING: z
      .string()
      .refine((s) => s === "true" || s === "false") // Ensure it's a boolean string
      .transform((s) => s === "true") // Convert to boolean
      .optional(), // Optional variable
    SMTP_HOST: z.string().min(1), // SMTP host
    SMTP_PORT: z.string().min(1).transform(value => Number(value)), // SMTP port
    SMTP_USER: z.string().min(1), // SMTP user
    SMTP_PASSWORD: z.string().min(1), // SMTP password
    SMTP_FROM: z.string().email(), // SMTP from email
    SMTP_FROM_NAME: z.string().min(1), // SMTP from name
    GOOGLE_CLIENT_ID: z.string().min(1).optional(), // Google client ID
    GOOGLE_CLIENT_SECRET: z.string().min(1).optional(), // Google client secret
    RASORPAY_KEY_SECRET: z.string().min(1), // Rasorpay key secret
    RASORPAY_WEBHOOK_SECRET: z.string().min(1), // Rasorpay webhook secret
    WHATSAPP_API_URL: z.string().url().optional(), // WhatsApp API URL
    WHATSAPP_API_KEY: z.string().min(1).optional(), // WhatsApp API token
    S3_ENDPOINT: z.string().url(),
    S3_BUCKET: z.string(),
    S3_REGION: z.string().optional(),
    S3_ACCESS_KEY_ID: z.string(),
    S3_SECRET_ACCESS_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url(), // URL for authentication service
    NEXT_PUBLIC_RASORPAY_KEY_ID: z.string().min(1), // Rasorpay key ID
    NEXT_PUBLIC_S3_PUBLIC_URL: z.string().url(), // S3 PUBLIC URL
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    NEXT_PUBLIC_RASORPAY_KEY_ID: process.env.NEXT_PUBLIC_RASORPAY_KEY_ID,
    NEXT_PUBLIC_S3_PUBLIC_URL: process.env.NEXT_PUBLIC_S3_PUBLIC_URL,
  },
  onValidationError: (error: ZodError) => {
    console.error(
      "❌ Invalid environment variables:",
      error.flatten().fieldErrors
    );
    process.exit(1); // Exit process on validation error
  },
  emptyStringAsUndefined: true, // Treat empty strings as undefined
});
