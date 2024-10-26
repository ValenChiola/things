import {
    NoteDTO,
    createNote,
    deleteNote as deleteNoteFn,
    getUserNotes as queryFn,
    updateNote as updateNoteFn,
} from "../api/notes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { generateRandomString } from "../helpers/random"
import { useCallback } from "react"
import { useDebounce } from "./useDebounce"
import { useUI } from "../contexts/UIContext"

export const queryKey = ["Notes"]
const emptyNote: Omit<NoteDTO, "id"> = {
    authorId: "",
    title: "Untitled",
    content: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}

export const useNotes = () => {
    const queryClient = useQueryClient()
    const updateNoteDebounce = useDebounce(updateNoteFn)
    const { showToast } = useUI()

    const { data: notes = [], ...rest } = useQuery({
        queryKey,
        queryFn,
    })

    const { mutate: startNote } = useMutation({
        mutationKey: ["Notes", "Start"],
        mutationFn: () => createNote(emptyNote),
        onMutate: () => {
            const snapshot = queryClient.getQueryData<NoteDTO[]>(queryKey)

            queryClient.setQueryData<NoteDTO[]>(queryKey, (old) =>
                old
                    ? old.concat({
                          id: generateRandomString(),
                          ...emptyNote,
                      })
                    : old
            )

            return { snapshot }
        },
        onError: (_, __, context) => {
            if (!context) return

            queryClient.setQueryData(queryKey, context.snapshot)
        },
        onSuccess: () => {
            showToast.success("Note created")
            queryClient.invalidateQueries({ queryKey })
        },
    })

    const { mutate: updateNote, isPending: isUpdating } = useMutation({
        mutationKey: ["Notes", "Update"],
        mutationFn: async (...args: Parameters<typeof updateNoteDebounce>) =>
            updateNoteDebounce(...args),
        onMutate: (note) => {
            const snapshot = queryClient.getQueryData<NoteDTO[]>(queryKey)

            queryClient.setQueryData<NoteDTO[]>(queryKey, (old) =>
                old
                    ? old.map((item) =>
                          item.id === note.id
                              ? {
                                    ...item,
                                    ...note,
                                    updatedAt: new Date().toISOString(),
                                }
                              : item
                      )
                    : old
            )

            return { snapshot }
        },
        onError: (_, __, context) => {
            if (!context) return

            queryClient.setQueryData(queryKey, context.snapshot)
        },
    })

    const { mutate: deleteNote } = useMutation({
        mutationKey: ["Notes", "Delete"],
        mutationFn: deleteNoteFn,
        onMutate: (id) => {
            const snapshot = queryClient.getQueryData<NoteDTO[]>(queryKey)

            queryClient.setQueryData<NoteDTO[]>(queryKey, (old) =>
                old ? old.filter((note) => note.id !== id) : old
            )

            showToast.success("Note deleted")

            return { snapshot }
        },
        onError: (_, __, context) => {
            if (!context) return

            queryClient.setQueryData(queryKey, context.snapshot)
        },
    })

    const getNoteData = useCallback(
        (id?: string) => notes.find((note) => note.id === id),
        [notes]
    )

    return {
        notes,
        startNote,
        updateNote,
        deleteNote,
        getNoteData,
        isUpdating,
        ...rest,
    }
}
