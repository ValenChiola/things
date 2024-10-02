import { Navigate } from "react-router-dom"
import Styles from "./MyData.module.css"
import { useMe } from "../hooks/useMe"

export const MyData = () => {
    const { me, isPending } = useMe()

    if (isPending) return <div>Loading your data...</div>
    if (!me) return <Navigate to="/login" />

    return (
        <aside className={Styles.myData}>
            <h2>My Data</h2>
            <dl>
                <dt>Display Name</dt>
                <dd>{me.displayName}</dd>
                <dt>Email</dt>
                <dd>{me.email}</dd>
            </dl>
        </aside>
    )
}
