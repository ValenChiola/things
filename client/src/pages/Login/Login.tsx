import { LoginData, useAuth } from "../../contexts/AuthContext"

import Styles from "./Login.module.css"
import { useState } from "react"

export const Login = () => {
    const { login } = useAuth()
    const [data, setData] = useState<LoginData>({
        email: "",
        password: "",
    })

    const onChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        setData((prev) => ({ ...prev, [name]: value }))

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login(data)
    }

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
