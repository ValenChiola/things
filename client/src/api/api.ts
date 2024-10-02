import Axios from "axios"

const { VITE_API_URL } = import.meta.env

export const Api = Axios.create({
    baseURL: VITE_API_URL,
})

export const setNewToken = (token: string | false) => {
    Api.defaults.headers.Authorization = token ? `Bearer ${token}` : token
    localStorage.setItem("token", `${token}`)
}

export type ApiData<T> = {
    data: T
    message: string
    success: boolean
    code: number
}
