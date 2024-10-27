import { ComponentProps } from "react"
import Markdown from "react-markdown"
import Styles from "./Preview.module.css"
import { useNote } from "../hooks/useNote"

export const Preview = ({
    id,
    ...rest
}: ComponentProps<typeof Markdown> & { id: string }) => {
    const { note, isLoading } = useNote(id)

    if (isLoading)
        return (
            <section className={Styles.container}>
                <span>Loading...</span>
            </section>
        )

    if (!note) return null

    return (
        <section className={Styles.container}>
            <Markdown {...rest} className={Styles.preview}>
                {note.content}
            </Markdown>
        </section>
    )
}
