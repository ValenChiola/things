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
    private server: FastifyInstance
    private host = APP_HOST
    private port = +APP_PORT

    constructor({ plugins, routes }: { plugins: Plugin[]; routes: Route[] }) {
        this.server = fastify({
            logger: loggerOptions ?? true,
        })
        this.register(plugins)
        this.routes(routes)
        this.connectToDb()
    }

    private register(plugins: Plugin[]) {
        this.server.log.info(`✔ Initializing: Plugins (${plugins.length})`)
        plugins.forEach(this.server.register)
    }

    private routes(routes: Route[]) {
        this.server.log.info(`✔ Initializing: Routes (${routes.length + 2})`)

        routes.forEach(({ routes, prefix }) =>
            this.server.register(routes, { prefix: `/api/${prefix}` })
        )

        this.server.get("/health-check", (_, reply) =>
            reply.send({ "Is server alive?": true })
        )

        this.server.get("/", (_, reply) => reply.send("Hello there!"))
    }

    private connectToDb() {
        DB.$connect()
            .then(() => log.info(`✔ Initializing: Database`))
            .catch((error) => log.error(`✖ Error: Database`, error))
    }

    public listen() {
        try {
            if (NODE_ENV == "test") return

            this.server.log.info(`✔ Initializing: Server on port ${this.port}`)
            this.server.listen(
                { port: this.port, host: this.host },
                (error) => {
                    if (error) throw error
                }
            )
        } catch (error) {
            this.server.log.error(error)
            process.exit(1)
        }
    }
}

export default Server
