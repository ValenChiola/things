import { NotesGetAssistantsSchema } from "../../../domain/validations/v1/notes.validations"
import { createController } from "../../../infrastructure/createController"
import { getAssistants } from "../../../domain/services/assistants/assistant.get.all.service"
import { isNoteBelongs } from "../../../domain/services/notes/notes.belongs.service"
import { sendError } from "../../../domain/error"

export default createController(
    NotesGetAssistantsSchema,
    async ({
        params: { id },
        jwt: {
            payload: { sub },
        },
    }) => {
        const belongs = await isNoteBelongs({
            noteId: id,
            userId: sub,
        })
        if (!belongs) return sendError("Forbidden", 403)

        const assistants = await getAssistants(id)

        return {
            assistants,
        }
    }
)
