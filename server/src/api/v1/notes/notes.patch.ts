import { NotesPatchSchema } from "../../../domain/validations/v1/notes.validations"
import { createController } from "../../../infrastructure/createController"
import { findOneNote } from "../../../domain/services/notes/notes.find.one.service"
import { sendError } from "../../../domain/error"
import { updateNote } from "../../../domain/services/notes/notes.update.service"

export default createController(
    NotesPatchSchema,
    async ({
        body,
        params: { id },
        jwt: {
            payload: { sub },
        },
    }) => {
        const existingNote = await findOneNote({
            where: { id },
            select: { authorId: true },
        })
        if (!existingNote) return sendError("Note not found.", 404)

        if (existingNote.authorId !== sub)
            return sendError("The note does not belong to you.", 401)

        const note = await updateNote(id, body)

        return {
            note,
        }
    }
)
