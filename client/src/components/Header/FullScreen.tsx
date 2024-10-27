import { Maximize } from "../icons/Maximize"
import { Minimize } from "../icons/Minimize"
import { useApp } from "../../contexts/AppContext"

export const FullScreen = () => {
    const { isFullScreen, toggleFullScreen } = useApp()

    if (isFullScreen) return <Minimize onClick={toggleFullScreen} />

    return <Maximize onClick={toggleFullScreen} />
}
