import { getNote } from "../api/notes"
import { useQuery } from "@tanstack/react-query"

export const useNote = (id?: string) => {
    const { data, ...rest } = useQuery({
        queryKey: ["Note", id],
        queryFn: () => getNote(id!),
        retry: false,
        enabled: !!id,
        staleTime: 1000 * 60 * 60,
    })

    return {
        ...data,
        ...rest,
    }
}
