import { NotesGetOneSchema } from "../../../domain/validations/v1/notes.validations"
import { createController } from "../../../infrastructure/createController"
import { findOneNote } from "../../../domain/services/notes/notes.find.one.service"
import { isNoteBelongs } from "../../../domain/services/notes/notes.belongs.service"
import { sendError } from "../../../domain/error"

export default createController(
    NotesGetOneSchema,
    async ({
        params: { id },
        jwt: {
            payload: { sub },
        },
    }) => {
        const note = await findOneNote({
            where: {
                id,
            },
            include: {
                assistants: true,
            },
        })
        if (!note) return sendError("Note not found", 404)

        if (
            !isNoteBelongs({
                ...note,
                userId: sub,
            })
        )
            return sendError("Note not found", 404)

        return {
            note,
        }
    }
)
