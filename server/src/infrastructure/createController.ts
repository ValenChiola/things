import { ErrorWithCode } from "../domain/error"
import { FastifyReply } from "fastify/types/reply"
import { FastifyRequest } from "fastify"
import { Schema } from "zod"
import { capitalize } from "../helpers/formatters"
import { log } from "./logger"
import { pick } from "../helpers/pick"

export const createController: CreateController =
    (schema, callback) => async (request, reply) => {
        try {
            let validatedRequest: Request | null = null

            if (schema) {
                const requestResult = schema.safeParse(request)

                if (!requestResult.success) {
                    const { errors: rawErrors } = requestResult.error

                    const message = rawErrors
                        .map(
                            ({ message, path }) =>
                                `${capitalize(`${path.at(-1)}`)}: ${capitalize(
                                    message,
                                )}`,
                        )
                        .join("; ")

                    const errors = rawErrors.map(({ path, message }) => ({
                        key: path.at(-1),
                        message: capitalize(message),
                    }))

                    return reply.status(400).send({
                        message,
                        errors,
                        code: 400,
                        success: false,
                        data: null,
                    })
                }

                validatedRequest = requestResult.data
            }

            const result = await callback(
                { ...request, ...validatedRequest },
                reply,
            )

            const { message = "Success", code = 200, ...data } = result ?? {}

            const response = {
                data,
                message,
                code,
                success: true,
            }

            return reply.status(code).send(response)
        } catch (error: ErrorWithCode | unknown) {
            if (error instanceof ErrorWithCode) {
                log.error(pick(error, ["message", "code"]))
                return reply.status(error.code).send({
                    data: null,
                    message: error.message,
                    code: error.code,
                    success: false,
                })
            } else {
                if (typeof error === "object" && error && "message" in error)
                    log.error(pick(error, ["message"]))

                return reply.status(500).send({
                    data: null,
                    message: "Something went wrong, please try again later.",
                    code: 500,
                    success: false,
                })
            }
        }
    }

type CreateController = <T extends Request>(
    schema: Schema<T> | null,
    callback: (
        request: RequestCallback<T>,
        reply: FastifyReply,
    ) => ResponseCallback,
    options?: { stream?: boolean },
) => (request: RequestCallback<T>, reply: FastifyReply) => void

interface Request<Body = unknown, Params = unknown, Query = unknown> {
    body?: Body
    params?: Params
    query?: Query
}

type RequestCallback<TRequest extends Request> = FastifyRequest<{
    Body: TRequest["body"]
    Params: TRequest["params"]
    Querystring: TRequest["query"]
}>

type ResponseCallback<
    T = Record<string, unknown> & {
        message?: string
        code?: number
        success?: boolean
    },
> = Promise<T> | T
