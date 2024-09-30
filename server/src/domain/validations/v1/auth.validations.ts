import { object, string } from "zod"

export const LoginSchema = object({
    body: object({
        email: string().email(),
        password: string().min(6),
    }),
})
