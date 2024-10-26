import { Api, ApiData, setNewToken } from "./api"

import { MeDTO } from "./users"

export const login = (data: LoginData) =>
    Api.post<LoginResponse>("/v1/auth/login", data).then(
        ({ data: { data } }) => data
    )

export const logout = () =>
    Api.delete("/v1/auth/logout").then(() => setNewToken(false))

export interface LoginData {
    email: string
    password: string
}

type LoginResponse = ApiData<{ me: MeDTO; token: string }>
