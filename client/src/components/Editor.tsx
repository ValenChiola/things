import { useEffect, useRef } from "react"

import Styles from "./Editor.module.css"
import { useNotes } from "../hooks/useNotes"
import { useParams } from "react-router-dom"

export const Editor = () => {
    const { id } = useParams()
    const { getNoteData, updateNote } = useNotes()
    const note = getNoteData(id)
    const ref = useRef<HTMLTextAreaElement>(null)

    /* Need this ref because otherwise the cursor on the `textarea` resets */
    useEffect(() => {
        if (note && ref.current) ref.current.value = note.content
    }, [note])

    if (!note) return null

    const onChange = (content: string) =>
        updateNote({
            id,
            content,
        })

    return (
        <section className={Styles.editor}>
            <textarea
                ref={ref}
                id="editor"
                onChange={({ target: { value } }) => onChange(value)}
                placeholder="Editor"
            />
        </section>
    )
}
