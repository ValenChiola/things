import { NotePostAssistantSchema } from "../../../domain/validations/v1/notes.validations"
import { addAssistant } from "../../../domain/services/notes/notes.add-assistant.service"
import { createController } from "../../../infrastructure/createController"
import { findOneNote } from "../../../domain/services/notes/notes.find.one.service"
import { findOneUser } from "../../../domain/services/users/user.find.one.service"
import { sendError } from "../../../domain/error"
import { sendEvent } from "../../../infrastructure/socket/socket"

export default createController(
    NotePostAssistantSchema,
    async ({ body: { email, noteId } }) => {
        const [note, user] = await Promise.all([
            findOneNote({
                where: { id: noteId },
                include: { assistants: true },
            }),
            findOneUser({
                where: { email },
            }),
        ])

        if (!note) return sendError("Note not found", 404)
        if (!user) return sendError("User not found", 404)

        const { id: userId } = user

        const alreadyIn = note.assistants.some((item) => item.userId === userId)
        if (alreadyIn) return sendError("Already an assistant!", 400)

        const assistant = await addAssistant({
            userId,
            noteId,
        })

        await sendEvent({
            event: "invalidate-query",
            payload: {
                queryKey: ["Notes"],
            },
            to: [userId],
        })

        return {
            message: "Assistant added!",
            assistant,
        }
    }
)
