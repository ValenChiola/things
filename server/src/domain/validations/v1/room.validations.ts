import { object, string } from "zod"

export const CreateRoomTokenPostSchema = object({
    body: object({
        room: string().min(1).max(100),
    }),
})
