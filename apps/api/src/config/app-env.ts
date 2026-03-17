import { z } from "zod";

const appEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  CORS_ORIGIN: z.string().min(1).default("http://localhost:5173"),
  DRAFT_TTL_HOURS: z.coerce.number().int().positive().default(168),
  ASSET_PRESIGN_TTL_MINUTES: z.coerce.number().int().positive().default(15),
  ASSET_MAX_TOTAL_SIZE_MB: z.coerce.number().int().positive().default(100),
  AWS_REGION: z.string().min(1, "AWS_REGION is required"),
  AWS_ACCESS_KEY_ID: z.string().min(1, "AWS_ACCESS_KEY_ID is required"),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, "AWS_SECRET_ACCESS_KEY is required"),
  AWS_S3_BUCKET: z.string().min(1, "AWS_S3_BUCKET is required"),
  AWS_S3_ASSET_PREFIX: z.string().min(1).default("drafts"),
  MONGODB_URI: z
    .string()
    .min(1, "MONGODB_URI is required")
    .startsWith("mongodb", "MONGODB_URI must start with mongodb"),
});

export type AppEnv = z.infer<typeof appEnvSchema>;

export function validateEnv(config: Record<string, unknown>): AppEnv {
  return appEnvSchema.parse(config);
}
