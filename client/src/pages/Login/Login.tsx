import { LoginData, login } from "../../api/auth"

import Styles from "./Login.module.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const Login = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<LoginData>({
        email: "",
        password: "",
    })

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        login(data).then(() => navigate("/"))
    }

    const onChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        setData((prev) => ({ ...prev, [name]: value }))

    return (
        <section className={Styles.container}>
            <h1>Things</h1>
            <form onSubmit={onSubmit}>
                <label>
                    Email
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={onChange}
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={onChange}
                    />
                </label>
                <button className="outlined rounded">Log In</button>
            </form>
        </section>
    )
}