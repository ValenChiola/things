import { Navigate, useParams } from "react-router-dom"
import { useEffect, useRef } from "react"

import Styles from "./Editor.module.css"
import { useMe } from "../hooks/useMe"
import { useNote } from "../hooks/useNote"
import { useNotes } from "../hooks/useNotes"

export const Editor = () => {
    const { id } = useParams()
    const { me } = useMe()
    const { note, isLoading } = useNote(id)
    const { updateNote } = useNotes()
    const ref = useRef<HTMLTextAreaElement>(null)

    const onChange = (content: string) =>
        updateNote({
            id,
            content,
        })

    /* Need this ref because otherwise the cursor on the `textarea` resets */
    useEffect(() => {
        if (note && ref.current) ref.current.value = note.content
    }, [note])

    if (!me || isLoading) return
    if (id && !note) return <Navigate to="/not-found" />

    return (
        <section className={Styles.editor}>
            {id ? (
                <textarea
                    ref={ref}
                    id="editor"
                    onChange={({ target: { value } }) => onChange(value)}
                    placeholder="Editor"
                />
            ) : (
                <>
                    <h1>Hello {me.displayName}!</h1>
                    <span>
                        Click on a note on the left to start editing, or create
                        a new one.
                    </span>
                </>
            )}
        </section>
    )
}
