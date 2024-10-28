import { AssistantDTO, NoteDTO, addAssistant as mutationFn } from "../api/notes"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useNote } from "./useNote"
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
    const { note, ...rest } = useNote(id)
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

    return {
        assistants: note?.assistants ?? [],
        addAssistant,
        ...rest,
    }
}
