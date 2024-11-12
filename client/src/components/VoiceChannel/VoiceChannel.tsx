import "@livekit/components-styles"

import { useEffect, useState } from "react"

import { Leave } from "./components/Leave"
import { LiveKitRoom } from "@livekit/components-react"
import { Microphone } from "./components/Microphone"
import { Participants } from "./components/Participants"
import Styles from "./VoiceChannel.module.css"
import { getRoomToken } from "../../api/room"
import { useParams } from "react-router-dom"

const serverUrl = "wss://things-8i2lofey.livekit.cloud"

export const VoiceChannel = () => {
    const { id } = useParams()
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        setToken(null)
    }, [id])

    if (!id) return null

    const join = () => getRoomToken(id).then(setToken)

    if (!token)
        return (
            <button onClick={join} className={Styles.join}>
                Join Voice Channel
            </button>
        )

    return (
        <LiveKitRoom
            video={false}
            screen={false}
            audio
            token={token}
            serverUrl={serverUrl}
            onDisconnected={() => setToken(null)}
            className={Styles.voiceChannel}
        >
            <Participants />
            <div className="flex center gap">
                <Microphone />
                <Leave />
            </div>
        </LiveKitRoom>
    )
}
