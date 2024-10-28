import { Download } from "./Download"
import { FullScreen } from "./FullScreen"
import { Share } from "./Share"
import Styles from "./Header.module.css"
import { useParams } from "react-router-dom"

export const Header = () => {
    const { id } = useParams()

    return (
        <nav className={Styles.toolBar}>
            <div className={Styles.left}>
                <FullScreen />
            </div>
            <div className={Styles.center}>
                <h1 className={Styles.title}>Things</h1>
            </div>
            <div className={Styles.right}>
                <Download id={id} />
                <Share id={id} />
            </div>
        </nav>
    )
}
