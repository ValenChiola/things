import { V1Routes } from "./api/v1/v1.routes"
import AuthPlugin from "./infrastructure/plugins/auth.plugin"
import CookiePlugin from "./infrastructure/plugins/cookie.plugin"
import CorsPlugin from "./infrastructure/plugins/cors.plugin"
import Server from "./infrastructure/server"
import { env } from "./env"
// env()

export const server = new Server({
    plugins: [AuthPlugin, CorsPlugin, CookiePlugin],
    routes: [...V1Routes],
})

server.listen()
