import { defineConfig } from 'drizzle-kit'
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DB_URL) {
    throw new Error("DB_URL environment variable is not set");
}

export default defineConfig({
    schema: "./src/drizzle/schema/index.ts",
    dialect: 'mysql',
    out: "./src/drizzle/migrations",
    dbCredentials: {
        url: process.env.DB_URL,
    },
    tablesFilter: ["accounting_*"],
    verbose: true,
    strict: true,
})