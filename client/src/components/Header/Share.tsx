import { CircleCross } from "../icons/CircleCross"
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
    const { assistants, addAssistant, deleteAssistant } = useAssistants(id)
    const modalState = useState(false)

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
            <ShareIcon onClick={() => modalState[1](true)} />
            <Modal state={modalState}>
                <div className={Styles.share}>
                    <div className={Styles.header}>
                        <h2>Share "{title}"</h2>
                        <CopyLink link={link} />
                    </div>

                    <div className={Styles.withAccess}>
                        <p className={Styles.sectionTitle}>
                            People with access:
                        </p>
                        {scope === "public" ? (
                            <p className={Styles.publicAccess}>Everyone</p>
                        ) : (
                            assistants?.map(({ id, user }) => (
                                <div key={id} className={Styles.userItem}>
                                    <div>
                                        <p className={Styles.userName}>
                                            {user.displayName}{" "}
                                            <small>
                                                (
                                                {author.id === user.id
                                                    ? "Author"
                                                    : "Assistant"}
                                                )
                                            </small>
                                        </p>
                                        <small className={Styles.userEmail}>
                                            {user.email}
                                        </small>
                                    </div>
                                    {isMyNote && author.id !== user.id && (
                                        <CircleCross
                                            onClick={() =>
                                                deleteAssistant({
                                                    id,
                                                })
                                            }
                                            className={Styles.removeAssistant}
                                        />
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {isMyNote ? (
                        <form onSubmit={onSubmit} className={Styles.addForm}>
                            <div className={Styles.formGroup}>
                                <label className={Styles.label} htmlFor="email">
                                    Share by email:
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className={Styles.input}
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                            <button type="submit" className="info">
                                Share
                            </button>
                        </form>
                    ) : (
                        <p className={Styles.ownerInfo}>
                            This note belongs to {author.displayName}
                        </p>
                    )}
                </div>
            </Modal>
        </>
    )
}
