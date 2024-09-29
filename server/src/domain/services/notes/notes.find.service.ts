import { DB } from "../../../infrastructure/database/db"

export const findManyNotes = DB.note.findMany
