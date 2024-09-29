import { DB } from "../../../infrastructure/database/db"

export const updateNote = (
    id: string,
    data: Parameters<typeof DB.note.update>[0]["data"]
) =>
    DB.note.update({
        where: { id },
        data,
    })
