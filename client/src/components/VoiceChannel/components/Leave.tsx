import { LeaveIcon } from "../../icons/LeaveIcon"
import { useDisconnectButton } from "@livekit/components-react"

export const Leave = () => (
    <button {...useDisconnectButton({}).buttonProps} className="icon accent">
        <LeaveIcon />
    </button>
)
