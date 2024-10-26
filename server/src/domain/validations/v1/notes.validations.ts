import { literal, object, string, union } from "zod"

const scope = union([literal("public"), literal("private")])

export const NotesPostSchema = object({
    body: object({
        title: string().min(1),
        content: string(),
        scope: scope.optional(),
    }),
})

export const NotesPatchSchema = object({
    params: object({
        id: string().uuid(),
    }),
    body: object({
        title: string().optional(),
        content: string().optional(),
        scope: scope.optional(),
    }),
})

export const NotesDeleteSchema = object({
    params: object({
        id: string().uuid(),
    }),
})
