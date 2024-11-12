import { MicDisabledIcon } from "../../icons/MicDisabledIcon"
import { MicIcon } from "../../icons/MicIcon"
import { useLocalParticipant } from "@livekit/components-react"

export const Microphone = () => {
    const { localParticipant, isMicrophoneEnabled } = useLocalParticipant()

    if (!localParticipant) return null

    const toggleMute = () => {
        localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled)
    }

    return (
        <button
            onClick={toggleMute}
            className={`icon ${isMicrophoneEnabled ? "" : "accent"}`}
        >
            {isMicrophoneEnabled ? <MicIcon /> : <MicDisabledIcon />}
        </button>
    )
}
