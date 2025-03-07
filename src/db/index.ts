import { env } from "@/env";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema/index";

export const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_TOKEN,
  concurrency: env.DB_MIGRATING ? 1 : undefined,
});

export const db = drizzle({ client, schema });