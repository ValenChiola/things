import { Editor } from "../../components/Editor"
import { Header } from "../../components/Header/Header"
import { MyData } from "../../components/MyData"
import { MyNotes } from "../../components/MyNotes"
import { Navigate } from "react-router-dom"
import Styles from "./Things.module.css"
import { useApp } from "../../contexts/AppContext"
import { useMe } from "../../hooks/useMe"
import { useToken } from "../../hooks/useToken"

export const Things = () => {
    const { isFullScreen } = useApp()
    const { me, isPending } = useMe()
    const { token, isExpired } = useToken()

    if (!token || isExpired) return <Navigate to="/login" />
    if (isPending) return <h2 className="full-center">Loading your data...</h2>
    if (!me) return null

    const className = isFullScreen ? Styles.isFullScreen : ""

    return (
        <div className={`${Styles.things} ${className}`}>
            <MyNotes />
            <Header />
            <Editor />
            <MyData />
        </div>
    )
}
