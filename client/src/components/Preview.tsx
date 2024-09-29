import { ComponentProps } from "react"
import Markdown from "react-markdown"
import Styles from "./Preview.module.css"
import { useNotes } from "../hooks/useNotes"
import { useParams } from "react-router-dom"

export const Preview = (props: ComponentProps<typeof Markdown>) => {
    const { id } = useParams()
    const { getNoteData } = useNotes()
    const note = getNoteData(id)

    if (!note) return null

    return (
        <section className={Styles.container}>
            <Markdown {...props} className={Styles.preview}>
                {note.content}
            </Markdown>
        </section>
    )
}
