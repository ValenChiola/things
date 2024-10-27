import { Api, ApiData } from "./api"

export const getUserNotes = () =>
    Api.get<ApiData<GetUserNotes>>("/v1/users/notes").then(
        ({ data }) => data.data.notes
    )

export const getNote = (id: string) =>
    Api.get<ApiData<{ note: NoteDTO }>>(`/v1/notes/${id}`).then(
        ({ data }) => data.data
    )

export const createNote = (note: Pick<NoteDTO, "title" | "content">) =>
    Api.post<ApiData<NoteDTO>>("/v1/notes", note).then(({ data }) => data.data)

export const updateNote = ({ id, ...rest }: Partial<NoteDTO>) =>
    Api.patch<ApiData<NoteDTO>>(`/v1/notes/${id}`, rest).then(
        ({ data }) => data.data
    )

export const deleteNote = (id: string) => Api.delete(`/v1/notes/${id}`)

export const addAssistant = (data: { email: string; noteId: string }) =>
    Api.post("/v1/notes/assistant", data)

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
    scope: string
    assistants: {
        id: string
        createdAt: Date
        updatedAt: Date
        userId: string
        noteId: string
    }[]
}
