import fastify, { FastifyInstance } from "fastify"
import { log, loggerOptions } from "./logger"

import { DB } from "./database/db"
import Plugin from "./plugins/plugin"
import Route from "../api/createVersionRoutes"

export const {
    NODE_ENV = "development",
    APP_HOST = "localhost",
    APP_PORT = 8000,
} = process.env
log.info(`✔ Initializing: Server App - [${NODE_ENV}]`)

class Server {
    public instance: FastifyInstance
    private host = APP_HOST
    private port = +APP_PORT

    constructor({ plugins, routes }: { plugins: Plugin[]; routes: Route[] }) {
        this.instance = fastify({
            logger: loggerOptions ?? true,
        })
        this.register(plugins)
        this.routes(routes)
        this.connectToDb()
    }

    private register(plugins: Plugin[]) {
        this.instance.log.info(`✔ Initializing: Plugins (${plugins.length})`)
        plugins.forEach(this.instance.register)
    }

    private routes(routes: Route[]) {
        this.instance.log.info(`✔ Initializing: Routes (${routes.length + 2})`)

        routes.forEach(({ routes, prefix }) =>
            this.instance.register(routes, { prefix: `/api/${prefix}` })
        )

        this.instance.get("/health-check", (_, reply) =>
            reply.send({ "Is server alive?": true })
        )

        this.instance.get("/", (_, reply) => reply.send("Hello there!"))
    }

    private connectToDb() {
        DB.$connect()
            .then(() => log.info(`✔ Initializing: Database`))
            .catch((error) => log.error(`✖ Error: Database`, error))
    }

    public listen() {
        try {
            if (NODE_ENV == "test") return

            this.instance.log.info(
                `✔ Initializing: Server on port ${this.port}`
            )
            this.instance.listen(
                { port: this.port, host: this.host },
                (error) => {
                    if (error) throw error
                }
            )
        } catch (error) {
            this.instance.log.error(error)
            process.exit(1)
        }
    }
}

export default Server
