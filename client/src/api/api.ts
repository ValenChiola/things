import Axios, { AxiosError, AxiosResponse } from "axios"

import toast from "react-hot-toast"

const { VITE_API_URL } = import.meta.env

export const Api = Axios.create({
    baseURL: VITE_API_URL,
})

Api.interceptors.response.use(
    <T extends Record<string, unknown> & { token?: string }>(
        response: AxiosResponse<ApiData<T>>
    ) => {
        const { data } = response.data
        if (data.token) setNewToken(data.token)
        return response
    },
    (error: AxiosError) => {
        const url = Api.getUri(error.config)
        if (url.includes("/login")) return Promise.reject(error)

        if (error.response?.status === 401) {
            setNewToken(false)
            toast.error("Session expired, please login again", {
                id: "session-expired",
            })
            setTimeout(() => (window.location.href = "/login"), 2000)
        }

        return Promise.reject(error)
    }
)

export const setNewToken = (token: string | false) => {
    Api.defaults.headers.Authorization = token ? `Bearer ${token}` : token

    if (token) localStorage.setItem("token", `${token}`)
    else localStorage.removeItem("token")
}

export type ApiData<T> = {
    data: T
    message: string
    success: boolean
    code: number
}
