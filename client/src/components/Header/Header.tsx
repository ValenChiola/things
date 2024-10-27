import { Download } from "./Download"
import { FullScreen } from "./FullScreen"
import { Resizer } from "./Resizer"
import { Share } from "./Share"
import Styles from "./Header.module.css"

export const Header = ({ id }: { id?: string }) => {
    return (
        <nav className={Styles.toolBar}>
            <div className={Styles.left}>
                <FullScreen />
            </div>
            <div className={Styles.center}>
                <h1 className={Styles.title}>Things</h1>
            </div>
            <div className={Styles.right}>
                <Resizer />
                <Download id={id} />
                <Share id={id} />
            </div>
        </nav>
    )
}
