import { object, string } from "zod"

export const UserPostSchema = object({
    body: object({
        email: string().email(),
        displayName: string().min(1),
        urlImage: string().url(),
        password: string().min(6),
    }),
})
