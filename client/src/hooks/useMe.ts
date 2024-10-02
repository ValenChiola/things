import { getMe as queryFn } from "../api/users"
import { useQuery } from "@tanstack/react-query"

export const useMe = () => {
    const token = localStorage.getItem("token")
    const queryKey = token ? ["Me", token] : [null]

    const { data, ...rest } = useQuery({
        queryKey,
        queryFn,
    })

    return { ...data, ...rest }
}
