import { Navigate, useParams } from "react-router-dom"

import { Editor } from "../components/Editor"
import { MyData } from "../components/MyData"
import { MyNotes } from "../components/MyNotes"
import { Preview } from "../components/Preview"
import { SplitPane } from "../components/SplitPane"
import Styles from "./Things.module.css"
import { ToolBar } from "../components/ToolBar/ToolBar"
import { setNewToken } from "../api/api"
import { useApp } from "../contexts/AppContext"
import { useEffect } from "react"
import { useMe } from "../hooks/useMe"

export const Things = () => {
    const { me, isPending } = useMe()
    const { isMenuOpen, split } = useApp()
    const { id } = useParams()

    useEffect(() => {
        const token = localStorage.getItem("token") ?? false
        setNewToken(token)
    }, [])

    if (isPending) return <div>Loading your data...</div>
    if (!me) return <Navigate to="/login" />

    return (
        <div className={`${Styles.app} ${isMenuOpen ? Styles.menuOpen : ""}`}>
            <MyNotes />
            <ToolBar />
            {id ? (
                <SplitPane split={split}>
                    <Editor />
                    <Preview />
                </SplitPane>
            ) : (
                <h1>
                    Hello {me.displayName}! Click on a note to start editing, or
                    create a new one.
                </h1>
            )}
            <MyData />
        </div>
    )
}
