import {
    AssistantDTO,
    NoteDTO,
    deleteAssistant as deleteAssistantFn,
    addAssistant as mutationFn,
} from "../api/notes"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useNote } from "./useNote"
import { useParams } from "react-router-dom"
import { useUI } from "../contexts/UIContext"

const emptyAssistant: AssistantDTO = {
    id: "",
    userId: "",
    noteId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
        id: "",
        displayName: "",
        email: "",
    },
}

export const useAssistants = (id?: string) => {
    const params = useParams()
    const { note, ...rest } = useNote(id ?? params.id)
    const { showToast } = useUI()
    const queryClient = useQueryClient()

    const { mutate: addAssistant } = useMutation({
        mutationKey: ["Note", id, "Assistant", "Add"],
        mutationFn,
        onMutate: ({ noteId }) => {
            const snapshot = queryClient.getQueryData<{ note: NoteDTO }>([
                "Note",
                id,
            ])

            if (snapshot)
                queryClient.setQueryData(["Note", id], {
                    note: {
                        ...snapshot.note,
                        assistants: snapshot.note.assistants.concat({
                            ...emptyAssistant,
                            noteId,
                        }),
                    },
                })

            return { snapshot }
        },
        onSuccess: ({ message }) => showToast.success(message),
        onError: ({ response }: { response: any }) =>
            showToast.error(response.data.message),
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ["Note", id] }),
    })

    const { mutate: deleteAssistant } = useMutation({
        mutationKey: ["Note", id, "Assistant", "Delete"],
        mutationFn: deleteAssistantFn,
        onMutate: ({ id }) => {
            const snapshot = queryClient.getQueryData<{ note: NoteDTO }>([
                "Note",
                id,
            ])

            if (snapshot)
                queryClient.setQueryData(["Note", id], {
                    note: {
                        ...snapshot.note,
                        assistants: snapshot.note.assistants.filter(
                            (item) => item.id !== id
                        ),
                    },
                })

            return { snapshot }
        },
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ["Note", id] }),
        onError: () => showToast.error("Failed to remove assistant"),
        onSuccess: () => showToast.success("Assistant removed"),
    })

    return {
        assistants: note?.assistants ?? [],
        addAssistant,
        deleteAssistant,
        ...rest,
    }
}
