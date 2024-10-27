import { NotePostAssistantSchema } from "../../../domain/validations/v1/notes.validations"
import { addAssistant } from "../../../domain/services/notes/notes.add-assistant.service"
import { createController } from "../../../infrastructure/createController"
import { findOneNote } from "../../../domain/services/notes/notes.find.one.service"
import { findOneUser } from "../../../domain/services/users/user.find.one.service"
import { sendError } from "../../../domain/error"

export default createController(
    NotePostAssistantSchema,
    async ({ body: { email, noteId } }) => {
        const [note, user] = await Promise.all([
            findOneNote({
                where: { id: noteId },
            }),
            findOneUser({
                where: { email },
            }),
        ])

        if (!note) return sendError("Note not found")
        if (!user) return sendError("User not found")

        const { id: userId } = user

        const assistant = await addAssistant({
            userId,
            noteId,
        })

        return {
            assistant,
        }
    }
)
