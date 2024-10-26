import { NotesPostSchema } from "../../../domain/validations/v1/notes.validations"
import { createController } from "../../../infrastructure/createController"
import { createNote } from "../../../domain/services/notes/notes.create.service"

export default createController(
    NotesPostSchema,
    async ({
        body,
        jwt: {
            payload: { sub: authorId },
        },
    }) => {
        const note = await createNote({
            authorId,
            scope: "private",
            ...body,
        })

        return {
            note,
        }
    }
)
