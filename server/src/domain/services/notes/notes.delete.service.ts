import { DB } from "../../../infrastructure/database/db"

export const deleteNote = (id: string, authorId?: string) =>
    DB.note.delete({
        where: { id, authorId },
        include: {
            author: { select: { displayName: true } },
            assistants: true,
        },
    })
