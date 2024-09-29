import { object, string } from "zod"

import { isDataView } from "util/types"

export const NotesPostSchema = object({
    body: object({
        title: string().min(1),
        content: string(),
    }),
})

export const NotesPatchSchema = object({
    params: object({
        id: string().uuid(),
    }),
    body: object({
        title: string().optional(),
        content: string().optional(),
    }),
})

export const NotesDeleteSchema = object({
    params: object({
        id: string().uuid(),
    }),
})
