import {
    NoteDTO,
    createNote,
    deleteNote as deleteNoteFn,
    getUserNotes as queryFn,
    updateNote as updateNoteFn,
} from "../api/notes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useUI } from "../contexts/UIContext"

export const queryKey = ["Notes"]
const emptyNote: Omit<NoteDTO, "id"> = {
    authorId: "",
    title: "Untitled",
    content: "",
    scope: "private",
    author: {
        id: "",
        displayName: "",
        email: "",
    },
    assistants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}

export const useNotes = () => {
    const { showToast } = useUI()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

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
                          id: "",
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
        mutationFn: updateNoteFn,
        onMutate: (note) => {
            const notesSnapshot = queryClient.getQueryData<NoteDTO[]>(queryKey)
            const noteSnapshot = queryClient.getQueryData<{ note: NoteDTO }>([
                "Note",
                note.id,
            ])

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

            queryClient.setQueryData<typeof noteSnapshot>(
                ["Note", note.id],
                (old) =>
                    old
                        ? {
                              ...old,
                              note: {
                                  ...old.note,
                                  ...note,
                              },
                          }
                        : old
            )

            return { notesSnapshot, noteSnapshot, note }
        },
        onError: (_, __, context) => {
            if (!context) return

            queryClient.setQueryData(queryKey, context.notesSnapshot)
            queryClient.setQueryData(
                ["Note", context.note.id],
                context.noteSnapshot
            )
        },
    })

    const { mutate: deleteNote } = useMutation({
        mutationKey: ["Notes", "Delete"],
        mutationFn: deleteNoteFn,
        onMutate: (id) => {
            const snapshot = queryClient.getQueryData<NoteDTO[]>(queryKey)
            const notes = snapshot?.filter((note) => note.id !== id) ?? []

            queryClient.setQueryData<NoteDTO[]>(queryKey, notes)

            navigate(`/${notes[0]?.id ?? ""}`)

            return { snapshot }
        },
        onError: (_, __, context) => {
            if (!context) return

            queryClient.setQueryData(queryKey, context.snapshot)

            showToast.error("Failed to delete note")
        },
        onSuccess: () => showToast.success("Note deleted"),
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
