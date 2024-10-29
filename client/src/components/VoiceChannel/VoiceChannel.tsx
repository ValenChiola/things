import { RemoteAudioTrack } from "agora-rtc-react"
import { useParams } from "react-router-dom"
import { useVoiceChannel } from "../../hooks/useVoiceChannel"

export const VoiceChannel = () => {
    const { id } = useParams()
    const { isConnected, isLoading, join, audioTracks } = useVoiceChannel(id)

    if (!isConnected) return <button onClick={join}>Join voice channel</button>
    if (isLoading) return <div>Connecting...</div>

    return (
        <div>
            {audioTracks.map((track) => (
                <RemoteAudioTrack key={track.getUserId()} play track={track} />
            ))}
        </div>
    )
}
