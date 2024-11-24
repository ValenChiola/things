import { DB } from "../../../infrastructure/database/db"
import { createAssistant } from "../assistants/assistant.create.service"

export const createNote = async (
    data: Parameters<typeof DB.note.create>[0]["data"]
) => {
    const note = await DB.note.create({ data })

    await createAssistant({ noteId: note.id, userId: data.authorId! })

    return note
}
