import toast from "react-hot-toast"

export const clipboard = (str: string, msg = "Copied to clipboard!") =>
    navigator.clipboard.writeText(str).then(() => toast.success(msg))
