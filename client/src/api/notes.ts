import Axios from "axios"

const ApiNotes = Axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4OTEyNjRmNC0xNzBmLTQ4ZWMtYTNmZi0yYTFlODc2YTZiNmUiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxNjYzOTAyMiwiZXhwIjoxNzkzOTAyMjIyfQ.cBlj9s69C41t4aKHGdzOBv2tRPcJv4-tL0wJRDr1Azo",
    },
})

export const getUserNotes = () =>
    ApiNotes.get<Api<GetUserNotes>>("/v1/users/notes").then(
        ({ data }) => data.data.notes
    )

export const createNote = (note: Pick<NoteDTO, "title" | "content">) =>
    ApiNotes.post<Api<NoteDTO>>("/v1/notes", note).then(({ data }) => data.data)

export const updateNote = ({ id, ...rest }: Partial<NoteDTO>) =>
    ApiNotes.patch<Api<NoteDTO>>(`/v1/notes/${id}`, rest).then(
        ({ data }) => data.data
    )

export const deleteNote = (id: string) => ApiNotes.delete(`/v1/notes/${id}`)

type Api<T> = {
    data: T
    message: string
    success: boolean
    code: number
}

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
