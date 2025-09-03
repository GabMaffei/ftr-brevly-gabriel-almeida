import { z } from 'zod'

const envSchema = z.object({
  VITE_FRONTEND_URL: z.url(),
  VITE_BACKEND_URL: z.url(),
})

const parsedEnv = envSchema.safeParse(import.meta.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables',
    parsedEnv.error.flatten().fieldErrors
  )
  throw new Error('Invalid environment variables.')
}

export const env = parsedEnv.data
