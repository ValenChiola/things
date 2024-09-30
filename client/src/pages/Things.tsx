import { Editor } from "../components/Editor"
import { MyNotes } from "../components/MyNotes"
import { Preview } from "../components/Preview"
import { SplitPane } from "../components/SplitPane"
import Styles from "./Things.module.css"
import { ToolBar } from "../components/ToolBar/ToolBar"
import { useApp } from "../contexts/AppContext"

export const Things = () => {
    const { isMenuOpen, split } = useApp()

    return (
        <div className={`${Styles.app} ${isMenuOpen ? Styles.menuOpen : ""}`}>
            <MyNotes />
            <ToolBar />
            <SplitPane split={split}>
                <Editor />
                <Preview />
            </SplitPane>
        </div>
    )
}
