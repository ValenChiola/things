import { DB } from "../../../infrastructure/database/db"

export const findOneNote = DB.note.findUnique
