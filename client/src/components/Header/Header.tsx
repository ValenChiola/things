import { Share } from "./Share"
import Styles from "./Header.module.css"
import { useParams } from "react-router-dom"

export const Header = () => {
    const { id } = useParams()

    return (
        <nav className={Styles.header}>
            <div className={Styles.left} />
            <div className={Styles.center}>
                <h1 className={Styles.title}>Things</h1>
            </div>
            <div className={Styles.right}>
                <Share id={id} />
            </div>
        </nav>
    )
}
