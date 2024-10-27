import toast from "react-hot-toast"

export const clipboard = (text: string, msg = "Copied to clipboard!") =>
    navigator.clipboard.writeText(text).then(() => toast.success(msg))
