import { createPlugin } from "./plugin"
import fastifyCors from "@fastify/cors"

const corsPlugin = createPlugin(
    async (instance) => {
        instance.register(fastifyCors, {
            origin: true,
            credentials: true,
        })
    },
    { name: "cors-plugin" }
)

export default corsPlugin
