import { defineConfig } from "drizzle-kit";

import { env } from "@/env";

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  dialect: "turso",
  out: "./src/db/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_TOKEN
  },
});