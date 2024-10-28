import { findManyNotes } from "../notes/notes.find.service"

export const getUserNotes = (authorId: string) =>
    findManyNotes({
        where: {
            OR: [
                { authorId },
                {
                    assistants: {
                        some: { userId: authorId },
                    },
                },
            ],
        },
        include: { assistants: true },
        orderBy: { createdAt: "desc" },
    })
