import { DB } from "../../../infrastructure/database/db"

export const createAssistant = (data: { noteId: string; userId: string }) =>
    DB.assistant.create({
        data,
        include: {
            user: {
                select: {
                    id: true,
                    displayName: true,
                    email: true,
                },
            },
        },
    })
