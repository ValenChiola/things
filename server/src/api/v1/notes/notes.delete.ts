import { NotesDeleteSchema } from "../../../domain/validations/v1/notes.validations"
import { createController } from "../../../infrastructure/createController"
import { deleteNote } from "../../../domain/services/notes/notes.delete.service"

export default createController(
    NotesDeleteSchema,
    async ({
        params: { id },
        jwt: {
            payload: { sub },
        },
    }) => {
        await deleteNote(id, sub)

        return {
            id,
            message: "Note deleted",
        }
    }
)
