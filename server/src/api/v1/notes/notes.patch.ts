import { DB } from "../../../infrastructure/database/db"
import { NotesPatchSchema } from "../../../domain/validations/v1/notes.validations"
import { createController } from "../../../infrastructure/createController"
import { findOneNote } from "../../../domain/services/notes/notes.find.one.service"
import { isNoteBelongs } from "../../../domain/services/notes/notes.belongs.service"
import { sendError } from "../../../domain/error"
import { sendEvent } from "../../../infrastructure/socket/socket"
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
            select: {
                scope: true,
                authorId: true,
                assistants: true,
            },
        })
        if (!existingNote) return sendError("Note not found.", 404)

        if (
            !isNoteBelongs({
                noteId: id,
                userId: sub,
            })
        )
            return sendError("Can't update this note", 401)

        const note = await updateNote(id, body)

        await sendEvent({
            event: "note-update",
            payload: note,
            to: [id],
            except: [sub],
        })

        return {
            note,
        }
    }
)
