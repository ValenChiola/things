import cookie from "@fastify/cookie"
import { createPlugin } from "./plugin"

const { COOKIE_SECRET } = process.env

const cookiePlugin = createPlugin(
    async (instance) => {
        instance.register(cookie, {
            secret: `${COOKIE_SECRET}`,
            hook: "onRequest",
            parseOptions: {},
        })
    },
    { name: "cookie-plugin" }
)

export default cookiePlugin
