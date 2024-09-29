import Styles from "./Editor.module.css"
import { useNotes } from "../hooks/useNotes"
import { useParams } from "react-router-dom"

export const Editor = () => {
    const { id } = useParams()
    const { getNoteData, updateNote } = useNotes()
    const note = getNoteData(id)

    if (!note) return null

    const onChange = (content: string) =>
        updateNote({
            id,
            content,
        })

    return (
        <section className={Styles.editor}>
            <textarea
                id="editor"
                value={note.content}
                onChange={({ target: { value } }) => onChange(value)}
                placeholder="Editor"
            ></textarea>
        </section>
    )
}
