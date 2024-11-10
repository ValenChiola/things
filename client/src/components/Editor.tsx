import { Navigate, useParams } from "react-router-dom"
import { useEffect, useRef } from "react"

import Styles from "./Editor.module.css"
import { Editor as TinyEditor } from "@tinymce/tinymce-react"
import { useMe } from "../hooks/useMe"
import { useNote } from "../hooks/useNote"
import { useNotes } from "../hooks/useNotes"

const { VITE_APP_TINY_MCE_API_KEY } = import.meta.env

export const Editor = () => {
    const { id } = useParams()
    const { me } = useMe()
    const { note, isLoading } = useNote(id)
    const { updateNote } = useNotes()
    const isExternalUpdate = useRef(false) // Prevents infinite loops when updating note via socket

    const onChange = (content: string) => {
        if (isExternalUpdate.current) isExternalUpdate.current = false
        else updateNote({ id, content })
    }

    useEffect(() => {
        if (note) isExternalUpdate.current = true
    }, [note])

    if (!me || isLoading) return
    if (id && !note) return <Navigate to="/not-found" />

    const { content, scope, authorId, author } = note ?? {}

    return (
        <section className={Styles.editor}>
            {id ? (
                <TinyEditor
                    apiKey={VITE_APP_TINY_MCE_API_KEY}
                    disabled={authorId !== me.id && scope === "public"}
                    init={{
                        width: "100%",
                        height: "100%",
                        auto_focus: true,
                        highlight_on_focus: false,
                        fullscreen_native: true,
                        draggable_modal: true,
                        branding: false,
                        resize: false,
                        mobile: {
                            theme: "mobile",
                        },
                        plugins: [
                            "help",
                            "fullscreen",
                            "anchor",
                            "autolink",
                            "charmap",
                            "emoticons",
                            "link",
                            "lists",
                            "searchreplace",
                            "visualblocks",
                            "wordcount",
                            "checklist",
                            "casechange",
                            "export",
                            "formatpainter",
                            "permanentpen",
                            "powerpaste",
                            "autocorrect",
                            "inlinecss",
                            "markdown",
                            "importword",
                            "exportword",
                            "exportpdf",
                        ],

                        toolbar:
                            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link | align lineheight | checklist numlist bullist indent outdent | removeformat emoticons charmap fullscreen | help",

                        tinycomments_author: author?.displayName,
                        tinycomments_author_name: me.displayName,
                        tinycomments_mode: "embedded",

                        exportpdf_converter_options: {
                            format: "Letter",
                            margin_top: "1in",
                            margin_right: "1in",
                            margin_bottom: "1in",
                            margin_left: "1in",
                        },

                        exportword_converter_options: {
                            document: { size: "Letter" },
                        },

                        importword_converter_options: {
                            formatting: {
                                styles: "inline",
                                resets: "inline",
                                defaults: "inline",
                            },
                        },
                    }}
                    onEditorChange={(content) => onChange(content)}
                    initialValue={content}
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
