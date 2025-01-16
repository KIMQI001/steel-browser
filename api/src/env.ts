import { z } from "zod";
import { config } from "dotenv";

config();

const envSchema = z.object({
  HOST: z.string().optional().default("0.0.0.0"),
  DOMAIN: z.string().optional(),
  PORT: z.string().optional().default("3000"),
  CDP_REDIRECT_PORT: z.string().optional().default("9222"),
  PROXY_URL: z.string().optional(),
  CAPTCHA_API_KEY: z.string().optional(),
  ENABLE_CAPTCHA_SOLVER: z.string().optional().default("false").transform(val => val === "true"),
  DEFAULT_HEADERS: z
    .string()
    .optional()
    .transform((val) => (val ? JSON.parse(val) : {}))
    .pipe(z.record(z.string()).optional().default({})),
  KILL_TIMEOUT: z.string().optional().default("25"),
});

export const env = envSchema.parse(process.env);
