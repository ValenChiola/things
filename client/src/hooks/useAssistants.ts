import {
    AssistantDTO,
    NoteDTO,
    deleteAssistant as deleteAssistantFn,
    getNoteAssistants,
    addAssistant as mutationFn,
} from "../api/notes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

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
    id ??= params.id
    const { showToast } = useUI()
    const queryClient = useQueryClient()

    const { data, ...rest } = useQuery({
        queryKey: ["Note", id, "Assistants"],
        queryFn: () => getNoteAssistants(id!),
        enabled: !!id,
        staleTime: Infinity,
    })

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
        addAssistant,
        deleteAssistant,
        ...data,
        ...rest,
    }
}
