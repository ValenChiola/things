import { DB } from "../../../infrastructure/database/db"

export const updateNote = (
    noteId: string,
    data: Parameters<typeof DB.note.update>[0]["data"]
) =>
    DB.note.update({
        where: { id: noteId },
        data,
    })
