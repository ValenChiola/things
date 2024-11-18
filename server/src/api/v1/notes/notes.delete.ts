import { NotesDeleteSchema } from "../../../domain/validations/v1/notes.validations"
import { createController } from "../../../infrastructure/createController"
import { deleteNote } from "../../../domain/services/notes/notes.delete.service"
import { findOneNote } from "../../../domain/services/notes/notes.find.one.service"
import { sendError } from "../../../domain/error"
import { sendEvent } from "../../../infrastructure/socket/socket"

export default createController(
    NotesDeleteSchema,
    async ({
        params: { id },
        jwt: {
            payload: { sub },
        },
    }) => {
        const { title, author, assistants } = await deleteNote(id, sub)

        const to = assistants.map(({ userId }) => userId)
        if (to.length)
            await Promise.all([
                sendEvent({
                    event: "invalidate-query",
                    payload: {
                        queryKey: ["Notes"],
                    },
                    to,
                    except: [sub],
                }),
                sendEvent({
                    event: "reset-query",
                    payload: {
                        queryKey: ["Note", id],
                    },
                    to,
                    except: [sub],
                }),
                sendEvent({
                    event: "show-toast",
                    payload: {
                        type: "success",
                        message: `${author.displayName} has deleted the note: "${title}"`,
                        duration: 5000,
                    },
                    to,
                    except: [sub],
                }),
            ])

        return {
            id,
            message: "Note deleted",
        }
    }
)
