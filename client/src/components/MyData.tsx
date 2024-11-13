import Styles from "./MyData.module.css"
import { VoiceChannel } from "./VoiceChannel/VoiceChannel"
import { logout } from "../api/auth"
import { useMe } from "../hooks/useMe"
import { useNavigate } from "react-router-dom"

export const MyData = () => {
    const { me, isPending } = useMe()
    const navigate = useNavigate()

    if (isPending) return <div>Loading your data...</div>

    const { displayName, email } = me ?? {}

    return (
        <aside className={Styles.myData}>
            <header className={Styles.header}>
                <p className={Styles.displayName}>{displayName}</p>
                <p className={Styles.email}>{email}</p>
            </header>
            <VoiceChannel />
            <button
                onClick={() => logout().then(() => navigate("/login"))}
                className={Styles.logoutButton}
            >
                Log out
            </button>
        </aside>
    )
}
