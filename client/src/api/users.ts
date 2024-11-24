import { Api, ApiData } from "./api"

export const me = () =>
    Api.get<MeGet>("/v1/users/me").then(({ data }) => data.data)

type MeGet = ApiData<{ me: MeDTO }>

export type MeDTO = {
    id: string
    createdAt: Date
    updatedAt: Date
    email: string
    displayName: string
    role: string
    urlImage: string
} | null
