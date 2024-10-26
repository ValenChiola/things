import { Navigate, useParams } from "react-router-dom"

import { Editor } from "../components/Editor"
import { MyData } from "../components/MyData"
import { MyNotes } from "../components/MyNotes"
import { Preview } from "../components/Preview"
import { SplitPane } from "../components/SplitPane"
import Styles from "./Things.module.css"
import { ToolBar } from "../components/ToolBar/ToolBar"
import { useApp } from "../contexts/AppContext"
import { useMe } from "../hooks/useMe"
import { useToken } from "../hooks/useToken"

export const Things = () => {
    const { isMenuOpen, split } = useApp()
    const { me, isPending } = useMe()
    const { token, isExpired } = useToken()
    const { id } = useParams()

    if (!token || isExpired) return <Navigate to="/login" />
    if (isPending) return <h2 className="full-center">Loading your data...</h2>
    if (!me) return null

    return (
        <div
            className={`${Styles.things} ${isMenuOpen ? Styles.menuOpen : ""}`}
        >
            <MyNotes />
            <ToolBar />
            {id ? (
                <SplitPane split={split}>
                    <Editor />
                    <Preview />
                </SplitPane>
            ) : (
                <main className={Styles.withoutNote}>
                    <h1>Hello {me.displayName}!</h1>
                    <span>
                        Click on a note on the left to start editing, or create
                        a new one.
                    </span>
                </main>
            )}
            <MyData />
        </div>
    )
}
