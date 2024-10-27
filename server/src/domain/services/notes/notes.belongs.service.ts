import { Assistant, Note } from "@prisma/client"

export const isNoteBelongs = ({
    userId,
    authorId,
    scope,
    assistants,
}: Pick<Note, "authorId" | "scope"> & {
    userId: string
    assistants: Assistant[]
}) =>
    authorId === userId ||
    scope === "public" ||
    assistants.some((item) => item.userId === userId)
