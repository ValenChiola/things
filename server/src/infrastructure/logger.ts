import pino, { LoggerOptions } from "pino"

export const loggerOptions: LoggerOptions = {
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: true,
            ignore: "pid,hostname,reqId,req,res,responseTime",
        },
    },
}

export const log = pino(loggerOptions)
