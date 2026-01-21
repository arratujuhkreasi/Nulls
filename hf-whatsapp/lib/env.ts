import { z } from 'zod';

const envSchema = z.object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().url("Invalid Supabase URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "Supabase anon key is required"),
    AI_ENGINE_URL: z.string().url().optional().default("http://127.0.0.1:8000"),
});

// Validate and export
export const env = envSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    AI_ENGINE_URL: process.env.AI_ENGINE_URL,
});

// Log validation success (only in development)
if (process.env.NODE_ENV === 'development') {
    console.log('✅ Environment variables validated successfully');
}
