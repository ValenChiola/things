import { CopyLink } from "../icons/CopyLink"
import { Modal } from "../Modal"
import { ShareIcon } from "../icons/ShareIcon"
import Styles from "./Share.module.css"
import { useAssistants } from "../../hooks/useAssistants"
import { useNote } from "../../hooks/useNote"
import { useState } from "react"
import { useToken } from "../../hooks/useToken"

export const Share = ({ id }: { id?: string }) => {
    const { sub } = useToken()
    const { note } = useNote(id)
    const { assistants, addAssistant } = useAssistants(id)
    const state = useState(false)

    if (!note || !id) return null

    const { title, scope, author } = note
    const isMyNote = author.id === sub
    const link = `${location.origin}/login?redirect=/${id}`

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const email = form.get("email") as string

        addAssistant({
            email,
            noteId: id,
        })
    }

    return (
        <>
            <ShareIcon onClick={() => state[1](true)} />
            <Modal state={state}>
                <div className={Styles.share}>
                    <div className={Styles.header}>
                        <h2>Compartir "{title}"</h2>
                        <CopyLink link={link} />
                    </div>

                    <div className={Styles.withAccess}>
                        <p>People with access: </p>
                        {scope === "public" ? (
                            <p>Everyone</p>
                        ) : (
                            assistants.map(({ id, user }) => (
                                <div key={id}>
                                    <p>{user.displayName}</p>
                                    <small>{user.email}</small>
                                </div>
                            ))
                        )}
                    </div>

                    {isMyNote ? (
                        <form onSubmit={onSubmit}>
                            <label>
                                Email:
                                <input type="email" name="email" />
                            </label>

                            <button>Add</button>
                        </form>
                    ) : (
                        <p>This note belongs to {author.displayName}</p>
                    )}
                </div>
            </Modal>
        </>
    )
}
