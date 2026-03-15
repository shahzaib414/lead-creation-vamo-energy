import { z } from "zod";

const appEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  MONGODB_URI: z
    .string()
    .min(1, "MONGODB_URI is required")
    .startsWith("mongodb", "MONGODB_URI must start with mongodb"),
});

export type AppEnv = z.infer<typeof appEnvSchema>;

export function validateEnv(config: Record<string, unknown>): AppEnv {
  return appEnvSchema.parse(config);
}

