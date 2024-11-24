import { NotePostAssistantSchema } from "../../../domain/validations/v1/notes.validations"
import { createAssistant } from "../../../domain/services/assistants/assistant.create.service"
import { createController } from "../../../infrastructure/createController"
import { findOneNote } from "../../../domain/services/notes/notes.find.one.service"
import { findOneUser } from "../../../domain/services/users/user.find.one.service"
import { sendError } from "../../../domain/error"
import { sendEvent } from "../../../infrastructure/socket/socket"

export default createController(
    NotePostAssistantSchema,
    async ({
        body: { email, noteId },
        jwt: {
            payload: { sub },
        },
    }) => {
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
        if (user.id === sub)
            return sendError("You can't add yourself as an assistant", 400)

        const { id: userId } = user

        const alreadyIn = note.assistants.some((item) => item.userId === userId)
        if (alreadyIn) return sendError("Already an assistant!", 400)

        const assistant = await createAssistant({
            userId,
            noteId,
        })

        await Promise.all([
            sendEvent({
                event: "invalidate-query",
                payload: {
                    queryKey: ["Notes"],
                },
                to: [userId],
            }),
            sendEvent({
                event: "show-toast",
                payload: {
                    type: "success",
                    message: "You have been added as an assistant!",
                },
                to: [userId],
            }),
        ])

        return {
            message: "Assistant added!",
            assistant,
        }
    }
)
