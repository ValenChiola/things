import { NoteDTO, addAssistant as mutationFn } from "../api/notes"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useNote } from "./useNote"

export const useAssistants = (id?: string) => {
    const { note, ...rest } = useNote(id)
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
                            id: "",
                            noteId,
                            userId: "",
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        }),
                    },
                })

            return { snapshot }
        },
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ["Note", id] }),
    })

    return {
        assistants: note?.assistants ?? [],
        addAssistant,
        ...rest,
    }
}
