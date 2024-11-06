import { Editor } from "../../components/Editor"
import { Header } from "../../components/Header/Header"
import { MyData } from "../../components/MyData"
import { MyNotes } from "../../components/MyNotes"
import { Navigate } from "react-router-dom"
import Styles from "./Things.module.css"
import { useMe } from "../../hooks/useMe"
import { useToken } from "../../hooks/useToken"

export const Things = () => {
    const { me, isPending } = useMe()
    const { token, isExpired } = useToken()

    if (!token || isExpired) return <Navigate to="/login" />
    if (isPending) return <h2 className="full-center">Loading your data...</h2>
    if (!me) return null

    return (
        <div className={Styles.things}>
            <MyNotes />
            <Header />
            <Editor />
            <MyData />
        </div>
    )
}
