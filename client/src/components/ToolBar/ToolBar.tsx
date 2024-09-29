import { Download } from "../icons/Download"
import { Resizer } from "./Resizer"
import Styles from "./ToolBar.module.css"
import { ToggleMenu } from "./ToggleMenu"
import { exportAsFile } from "../../helpers/files"
import { useNotes } from "../../hooks/useNotes"
import { useParams } from "react-router-dom"

export const ToolBar = () => {
    const { id } = useParams()
    const { getNoteData } = useNotes()
    const note = getNoteData(id)

    return (
        <nav className={Styles.toolBar}>
            <div className={Styles.left}>
                <ToggleMenu />
            </div>
            <div className={Styles.center}>
                <h1 className={Styles.title}>Things</h1>
            </div>
            <div className={Styles.right}>
                <Resizer />
                <Download onClick={() => note && exportAsFile(note)} />
            </div>
        </nav>
    )
}
