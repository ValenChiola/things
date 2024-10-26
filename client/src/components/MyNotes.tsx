import { Link, useNavigate, useParams } from "react-router-dom"

import { Minus } from "./icons/Minus"
import { NoteDTO } from "../api/notes"
import { Plus } from "./icons/Plus"
import Styles from "./MyNotes.module.css"
import { useNotes } from "../hooks/useNotes"
import { useState } from "react"

export const MyNotes = () => {
    const { notes, status, startNote } = useNotes()

    if (status === "pending")
        return (
            <aside className={Styles.myNotes}>
                <p>Loading...</p>
            </aside>
        )

    if (status === "error")
        return (
            <aside className={Styles.myNotes}>
                <p>Error :/</p>
            </aside>
        )

    return (
        <aside className={Styles.myNotes}>
            <header className={Styles.header}>
                <h2>My Notes</h2>
                <Plus onClick={() => startNote()} />
            </header>
            <div className={Styles.items}>
                {notes.map((note, index) => (
                    <NoteItem key={index} {...note} />
                ))}
            </div>
        </aside>
    )
}

const NoteItem = ({ id, title }: NoteDTO) => {
    const [isEditing, setIsEditing] = useState(false)
    const { id: noteId } = useParams()
    const { isUpdating, updateNote, deleteNote } = useNotes()
    const navigate = useNavigate()

    if (isEditing)
        return (
            <input
                type="text"
                value={title}
                onChange={({ target: { value: title } }) =>
                    updateNote({ id, title })
                }
                onBlur={() => setIsEditing(false)}
            />
        )

    const onDelete = () => {
        if (!confirm("Are you sure you want to delete this note?")) return
        deleteNote(id)
        navigate("/")
    }

    const className =
        noteId === id ? Styles.active : isUpdating ? Styles.disabled : ""

    return (
        <Link
            to={`/${id}`}
            className={className}
            onDoubleClick={() => setIsEditing((old) => !old)}
            aria-disabled={isUpdating}
            title={title}
        >
            {title}
            <Minus onClick={onDelete} />
        </Link>
    )
}
