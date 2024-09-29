import fastifyPlugin, { PluginMetadata } from "fastify-plugin"

import { FastifyInstance } from "fastify"

export const createPlugin = (
    pluginFn: (fastify: FastifyInstance) => void,
    options: PluginOptions
    // @ts-ignore
): Plugin => fastifyPlugin(pluginFn, options)

type PluginOptions = PluginMetadata & { name: string }

type Plugin = ReturnType<typeof fastifyPlugin>

export default Plugin
