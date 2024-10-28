import { useNavigate } from "react-router-dom"

export const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="full-center">
            <div className="flex center column">
                <h2>
                    We couldn't find this note! Make sure you got the correct
                    link.
                </h2>
                <button className="link" onClick={() => navigate("/")}>
                    Go home
                </button>
            </div>
        </div>
    )
}
