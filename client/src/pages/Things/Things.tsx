import { Navigate, useParams } from "react-router-dom"

import { Editor } from "../../components/Editor"
import { Header } from "../../components/Header/Header"
import { MyData } from "../../components/MyData"
import { MyNotes } from "../../components/MyNotes"
import { useMe } from "../../hooks/useMe"
import { useNote } from "../../hooks/useNote"
import { useToken } from "../../hooks/useToken"
import Styles from "./Things.module.css"

export const Things = () => {
    const { token, isExpired } = useToken()
    const { id } = useParams()
    const { note, ...restNote } = useNote(id)
    const { me, ...restMe } = useMe()

    const isPending = restMe.isPending || (restNote.isPending && id)

    if (!token || isExpired) return <Navigate to="/login" />
    if (isPending) return <h2 className="full-center">Loading your data...</h2>
    if (id && !note) return <Navigate to="/not-found" />
    if (!me) return <Navigate to="/login" />

    return (
        <div className={Styles.things}>
            <MyNotes />
            <Header />
            <Editor />
            <MyData />
        </div>
    )
}
