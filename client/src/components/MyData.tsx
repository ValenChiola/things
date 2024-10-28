import { Navigate, useNavigate } from "react-router-dom"

import Styles from "./MyData.module.css"
import { VoiceChannel } from "./VoiceChannel/VoiceChannel"
import { logout } from "../api/auth"
import { useMe } from "../hooks/useMe"

export const MyData = () => {
    const { me, isPending } = useMe()
    const navigate = useNavigate()

    if (isPending) return <div>Loading your data...</div>
    if (!me) return <Navigate to="/login" />

    const { displayName, email } = me

    return (
        <aside className={Styles.myData}>
            <header>
                <h2>My Data</h2>
                <p>{displayName}</p>
                <p>{email}</p>
            </header>
            <VoiceChannel />
            <button onClick={() => logout().then(() => navigate("/login"))}>
                Log out
            </button>
        </aside>
    )
}
