import { literal, object, string, union } from "zod"

const scope = union([literal("public"), literal("private")])
const ParamsWithId = object({
    id: string().uuid(),
})

export const NotesPostSchema = object({
    body: object({
        title: string().min(1),
        content: string(),
        scope: scope.optional(),
    }),
})

export const NotePostAssistantSchema = object({
    body: object({
        email: string().email(),
        noteId: string().uuid(),
    }),
})

export const NotesPatchSchema = object({
    params: ParamsWithId,
    body: object({
        title: string().optional(),
        content: string().optional(),
        scope: scope.optional(),
    }),
})

export const NotesDeleteSchema = object({
    params: ParamsWithId,
})

export const NotesGetOneSchema = object({
    params: ParamsWithId,
})

export const NotesDeleteAssistantSchema = object({
    body: object({
        id: string().uuid(),
    }),
})

export const NotesGetAssistantsSchema = object({
    params: ParamsWithId,
})
