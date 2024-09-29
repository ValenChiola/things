import { createController } from "../../../infrastructure/createController"
import { getUserNotes } from "../../../domain/services/users/users.get.notes.service"

export default createController(
    null,
    async ({
        jwt: {
            payload: { sub },
        },
    }) => {
        const notes = await getUserNotes(sub)

        return {
            notes,
        }
    }
)
