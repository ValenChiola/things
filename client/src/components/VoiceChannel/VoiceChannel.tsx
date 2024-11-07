import "@livekit/components-styles"

import {
    LiveKitRoom,
    useDisconnectButton,
    useLocalParticipant,
    useParticipants,
} from "@livekit/components-react"
import { useEffect, useState } from "react"

import { getRoomToken } from "../../api/room"
import styles from "./VoiceChannel.module.css"
import { useAssistants } from "../../hooks/useAssistants"
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

    if (!token) {
        return (
            <div className={styles.container}>
                <button onClick={join} className={styles.joinButton}>
                    Join Voice Channel
                </button>
            </div>
        )
    }

    return (
        <LiveKitRoom
            video={false}
            screen={false}
            audio
            token={token}
            serverUrl={serverUrl}
            data-lk-theme="default"
            className={styles.container}
            onDisconnected={() => setToken(null)}
        >
            <div className={styles.audioConference}>
                <Participants />
                <Mic />
                <LeaveButton />
            </div>
        </LiveKitRoom>
    )
}

const Participants = () => {
    const { id } = useParams()
    const participants = useParticipants()
    const { assistants } = useAssistants(id)

    const diff = assistants.filter(
        ({ userId }) =>
            !participants.find(({ identity }) => identity === userId)
    )

    useEffect(() => {
        participants.forEach((participant) => {
            participant.on("trackSubscribed", (track) => {
                if (track.kind === "audio") {
                    const audioElement = document.createElement("audio")
                    audioElement.srcObject = track.mediaStream ?? null
                    audioElement.play()
                    audioElement.autoplay = true
                }
            })
        })

        return () => {
            participants.forEach((participant) => {
                participant.removeAllListeners("trackSubscribed")
            })
        }
    }, [participants])

    return (
        <div className={styles.participantsList}>
            {participants.map(
                ({ identity, name, audioLevel, isMicrophoneEnabled }) => (
                    <div
                        key={identity}
                        className={`${styles.participant} ${
                            audioLevel ? styles.speaking : ""
                        }`}
                    >
                        <span className={styles.participantName}>
                            {name} mic: {isMicrophoneEnabled ? "on" : "off"}
                        </span>
                    </div>
                )
            )}
            {diff.map((assistant) => (
                <div
                    key={assistant.userId}
                    className={`${styles.participant} ${styles.disabled}`}
                >
                    <span className={styles.participantName}>
                        {assistant.user.displayName}
                    </span>
                </div>
            ))}
        </div>
    )
}

const Mic = () => {
    const { localParticipant } = useLocalParticipant()
    const [isMuted, setIsMuted] = useState(false)

    const toggleMute = () => {
        if (localParticipant) {
            if (isMuted) {
                localParticipant.setMicrophoneEnabled(true)
            } else {
                localParticipant.setMicrophoneEnabled(false)
            }
            setIsMuted(!isMuted)
        }
    }

    return (
        <div className={styles.micContainer}>
            <button onClick={toggleMute} className={styles.micButton}>
                {isMuted ? "Unmute" : "Mute"}
            </button>
            <span className={styles.micStatus}>
                {isMuted ? "Mic is off" : "Mic is on"}
            </span>
        </div>
    )
}

const LeaveButton = () => {
    const { buttonProps } = useDisconnectButton({})

    return (
        <button {...buttonProps} className={styles.leaveButton}>
            Leave
        </button>
    )
}
