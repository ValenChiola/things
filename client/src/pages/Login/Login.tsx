import { LoginData, login } from "../../api/auth"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import Styles from "./Login.module.css"
import { useToken } from "../../hooks/useToken"
import { useUI } from "../../contexts/UIContext"

export const Login = () => {
    const { token } = useToken()
    const { showError } = useUI()
    const [params] = useSearchParams()
    const navigate = useNavigate()

    const redirect = params.get("redirect")

    const [data, setData] = useState<LoginData>({
        email: "",
        password: "",
    })

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        login(data)
            .then(() => (redirect ? navigate(`../${redirect}`) : navigate("/")))
            .catch(({ response: { data } }) =>
                showError(data?.message ?? "Invalid credentials"),
            )
    }

    const onChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        setData((prev) => ({ ...prev, [name]: value }))

    useEffect(() => {
        if (!token) return
        if (redirect) navigate(`../${redirect}`)
        else navigate("/")
    }, [redirect, token])

    return (
        <section className={Styles.container}>
            <div className="flex center column gap-3">
                <h1>Things</h1>
                <form onSubmit={onSubmit}>
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            autoComplete="username"
                            value={data.email}
                            onChange={onChange}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            value={data.password}
                            onChange={onChange}
                        />
                    </label>
                    <button
                        className="outlined rounded"
                        disabled={Object.values(data).some((item) => !item)}
                    >
                        Login in
                    </button>
                </form>
            </div>
        </section>
    )
}
