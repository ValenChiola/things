import { infer, number, object, string } from "zod"

import AuthPlugin from "./infrastructure/plugins/auth.plugin"
import CookiePlugin from "./infrastructure/plugins/cookie.plugin"
import CorsPlugin from "./infrastructure/plugins/cors.plugin"
import Server from "./infrastructure/server"
import { V1Routes } from "./api/v1/v1.routes"
import { config } from "dotenv"

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
    WEBSOCKET_URL: string(),
})

//@ts-expect-error - Adding the parsed env to the process.env
process.env = {
    ...process.env,
    ...envSchema.parse(process.env),
}

export const server = new Server({
    plugins: [AuthPlugin, CorsPlugin, CookiePlugin],
    routes: [...V1Routes],
})

server.listen()

declare global {
    namespace NodeJS {
        interface ProcessEnv extends infer<typeof envSchema> {}
    }
}
