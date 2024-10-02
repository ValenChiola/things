import { Api, ApiData } from "./api"

export const getUserNotes = () =>
    Api.get<ApiData<GetUserNotes>>("/v1/users/notes").then(
        ({ data }) => data.data.notes
    )

export const createNote = (note: Pick<NoteDTO, "title" | "content">) =>
    Api.post<ApiData<NoteDTO>>("/v1/notes", note).then(({ data }) => data.data)

export const updateNote = ({ id, ...rest }: Partial<NoteDTO>) =>
    Api.patch<ApiData<NoteDTO>>(`/v1/notes/${id}`, rest).then(
        ({ data }) => data.data
    )

export const deleteNote = (id: string) => Api.delete(`/v1/notes/${id}`)

interface GetUserNotes {
    notes: NoteDTO[]
}

export interface NoteDTO {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
    authorId: string
}
