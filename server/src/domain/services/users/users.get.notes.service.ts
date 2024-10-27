import { findManyNotes } from "../notes/notes.find.service"

export const getUserNotes = (authorId: string) =>
    findManyNotes({
        where: { authorId },
        include: { assistants: true },
        orderBy: { createdAt: "desc" },
    })
