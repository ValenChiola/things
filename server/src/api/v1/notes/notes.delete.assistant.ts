import { NotesDeleteAssistantSchema } from "../../../domain/validations/v1/notes.validations"
import { createController } from "../../../infrastructure/createController"
import { deleteAssistant } from "../../../domain/services/assistants/assistant.delete.service"
import { sendEvent } from "../../../infrastructure/socket/socket"

export default createController(
    NotesDeleteAssistantSchema,
    async ({ body }) => {
        const assistant = await deleteAssistant(body)

        await sendEvent({
            event: "invalidate-query",
            payload: {
                queryKey: ["Notes"],
            },
            to: [assistant.userId],
        })

        return {
            assistant,
        }
    }
)
