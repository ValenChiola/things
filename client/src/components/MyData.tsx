import Styles from "./MyData.module.css"
import { UserImage } from "./UserImage"
import { VoiceChannel } from "./VoiceChannel/VoiceChannel"
import { logout } from "../api/auth"
import { useMe } from "../hooks/useMe"
import { useNavigate } from "react-router-dom"

export const MyData = () => {
    const { me, isPending } = useMe()
    const navigate = useNavigate()

    if (isPending) return <div>Loading your data...</div>

    if (!me) return <div>Something went wrong</div>

    return (
        <aside className={Styles.myData}>
            <header className={Styles.header}>
                <UserImage {...me} />
                <p className={Styles.email}>{me.email}</p>
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
