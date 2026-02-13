import { config } from "dotenv"
import { infer, number, object, string, ZodError } from "zod"

config()

Error.stackTraceLimit = Infinity

const envSchema = object({
    JWT_SECRET: string().min(1),
    JWT_EXPIRES_IN: string().min(1),
    JWT_REFRESH_TOKEN_EXP: string().min(1),
    DATABASE_URL: string().min(1),
    COOKIE_SECRET: string().min(1),
    NODE_ENV: string().optional(),
    APP_HOST: string().optional(),
    APP_PORT: number().optional(),
    LIVEKIT_API_KEY: string().min(1),
    LIVEKIT_API_SECRET: string().min(1),
    WEBSOCKET_URL: string(),
})

export const env = () => {
    try {
        //@ts-expect-error - Adding the parsed env to the process.env
        process.env = {
            ...process.env,
            ...envSchema.parse(process.env),
        }
    } catch (error) {
        if (error instanceof ZodError)
            console.error(
                "❌ Invalid environment variables:",
                error.issues
                    .map(({ path, message }) => `${path.at(-1)}: ${message}`)
                    .join("\n"),
            )
        else console.error("❌ Invalid environment variables:", error)
        process.exit(1)
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends infer<typeof envSchema> {}
    }
}
