import { server } from "../../.."

export const signPayload = (
    ...args: Parameters<typeof server.instance.jwt.sign>
) => server.instance.jwt.sign(...args)
