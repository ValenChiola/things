import { Assistant, Note } from "@prisma/client"

import { findOneNote } from "./notes.find.one.service"

export const isNoteBelongs = async ({
    noteId,
    userId,
}: {
    noteId: string
    userId: string
}) => {
    const note = await findOneNote({
        where: { id: noteId },
        include: {
            assistants: {
                include: {
                    user: {
                        select: {
                            id: true,
                        },
                    },
                },
            },
        },
    })

    if (!note) return false

    const { authorId, scope, assistants } = note

    return (
        authorId === userId ||
        scope === "public" ||
        assistants.some((item) => item.userId === userId)
    )
}
