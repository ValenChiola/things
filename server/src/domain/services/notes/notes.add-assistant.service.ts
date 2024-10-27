import { DB } from "../../../infrastructure/database/db"

export const addAssistant = (data: { noteId: string; userId: string }) =>
    DB.assistant.create({
        data,
    })
