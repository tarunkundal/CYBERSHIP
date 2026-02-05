import { z } from "zod";

const envSchema = z.object({
    UPS_CLIENT_ID: z.string(),
    UPS_CLIENT_SECRET: z.string(),
    UPS_BASE_URL: z.string(),
    NODE_ENV: z.string().default("development"),
});

export const env = envSchema.parse(process.env);
