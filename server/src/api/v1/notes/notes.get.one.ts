import { NotesGetOneSchema } from "../../../domain/validations/v1/notes.validations"
import { createController } from "../../../infrastructure/createController"
import { findOneNote } from "../../../domain/services/notes/notes.find.one.service"
import { isNoteBelongs } from "../../../domain/services/notes/notes.belongs.service"
import { sendError } from "../../../domain/error"
import { signPayload } from "../../../domain/services/auth/auth.sign.payload.service"

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
                author: {
                    select: {
                        id: true,
                        displayName: true,
                        email: true,
                    },
                },
                assistants: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                displayName: true,
                                email: true,
                            },
                        },
                    },
                },
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

        const token = signPayload({
            sub,
            noteId: note.id,
        })

        return {
            note,
            token,
        }
    }
)
