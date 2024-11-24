import { DB } from "../../../infrastructure/database/db"

export const getAssistants = async (noteId: string) =>
    DB.assistant.findMany({
        where: {
            noteId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    displayName: true,
                    urlImage: true,
                },
            },
        },
    })
