import { SignOptions, SignPayloadType } from "@fastify/jwt"

import { server } from "../../.."

const { JWT_EXPIRES_IN } = process.env

export const signPayload = (
    payload: SignPayloadType,
    options?: Partial<SignOptions>
) =>
    server.instance.jwt.sign(payload, {
        expiresIn: JWT_EXPIRES_IN,
        ...options,
    })
