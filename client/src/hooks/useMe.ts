import { me as queryFn } from "../api/users"
import { useQuery } from "@tanstack/react-query"
import { useToken } from "./useToken"

export const useMe = () => {
    const { token, sub } = useToken()
    const queryKey = token ? ["Me", sub] : [null]

    const { data, ...rest } = useQuery({
        queryKey,
        queryFn,
        enabled: !!token,
    })

    return { ...data, ...rest }
}
