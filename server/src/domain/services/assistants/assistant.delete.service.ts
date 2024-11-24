import { DB } from "../../../infrastructure/database/db"

export const deleteAssistant = (where: { id: string }) =>
    DB.assistant.delete({ where })
