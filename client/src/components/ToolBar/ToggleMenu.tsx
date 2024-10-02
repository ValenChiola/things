import { Cross } from "../icons/Cross"
import { Hamburger } from "../icons/Hamburger"
import { useApp } from "../../contexts/AppContext"

export const ToggleMenu = () => {
    const { isMenuOpen, toggleMenuOpen } = useApp()

    if (isMenuOpen) return <Cross onClick={toggleMenuOpen} />

    return <Hamburger onClick={toggleMenuOpen} />
}
