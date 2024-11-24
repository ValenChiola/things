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

export const getNoteAssistants = (id: string) =>
    Api.get<ApiData<{ assistants: AssistantDTO[] }>>(
        `/v1/notes/${id}/assistants`
    ).then(({ data }) => data.data)

export const addAssistant = (data: { email: string; noteId: string }) =>
    Api.post<ApiData<PostAddAssistant>>("/v1/notes/assistant", data).then(
        ({ data }) => data
    )

export const deleteAssistant = (data: { id: string }) =>
    Api.delete(`/v1/notes/assistant`, {
        data,
    })

interface GetUserNotes {
    notes: NoteDTO[]
}

interface PostAddAssistant {
    assistant: AssistantDTO
}

export interface NoteDTO {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
    authorId: string
    scope: string
    author: UserNoteDTO
    assistants: AssistantDTO[]
}

export interface AssistantDTO {
    noteId: string
    id: string
    userId: string
    createdAt: Date
    updatedAt: Date
    user: UserNoteDTO
}

interface UserNoteDTO {
    id: string
    displayName: string
    email: string
    urlImage: string
}
