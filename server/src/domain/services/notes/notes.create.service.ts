import { DB } from "../../../infrastructure/database/db"

export const createNote = (
    data: Parameters<typeof DB.note.create>[0]["data"]
) => DB.note.create({ data })
