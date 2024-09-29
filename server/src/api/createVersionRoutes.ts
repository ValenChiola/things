import {
    FastifyInstance,
    FastifyPluginOptions,
    HookHandlerDoneFunction,
} from "fastify"

export const createVersionRoute = (prefix: string, routes: Route[]): Route[] =>
    routes.map((route) => ({
        ...route,
        prefix: `${prefix}/${route.prefix}`,
    }))

export default interface Route {
    prefix: string
    routes: (
        fastify: FastifyInstance,
        options: FastifyPluginOptions,
        done: HookHandlerDoneFunction
    ) => void
}
