import { ResizeHorizontal } from "../icons/ResizeHorizontal"
import { ResizeVertical } from "../icons/ResizeVertical"
import { useApp } from "../../contexts/AppContext"

export const Resizer = () => {
    const { split, toggleSplit } = useApp()

    if (split === "vertical") return <ResizeVertical onClick={toggleSplit} />

    return <ResizeHorizontal onClick={toggleSplit} />
}
