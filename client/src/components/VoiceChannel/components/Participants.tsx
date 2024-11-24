import { useEffect, useMemo } from "react"

import { AssistantDTO } from "../../../api/notes"
import { MicDisabledIcon } from "../../icons/MicDisabledIcon"
import { MicIcon } from "../../icons/MicIcon"
import Styles from "./Participants.module.css"
import { UserImage } from "../../UserImage"
import { useAssistants } from "../../../hooks/useAssistants"
import { useParticipants as useRemoteParticipants } from "@livekit/components-react"

export const Participants = () => {
    const { assistants } = useAssistants()
    const participants = useRemoteParticipants()

    const [connected, notConnected] = useMemo(
        () =>
            assistants?.reduce(
                (acc, item) => {
                    const participant = participants.find(
                        ({ identity }) => identity === item.userId
                    )
                    if (participant) {
                        const { audioLevel, isMicrophoneEnabled } = participant //? Why does not work spreading the participant object directly?
                        acc[0].push({
                            ...item.user,
                            audioLevel,
                            isMicrophoneEnabled,
                        })
                    } else acc[1].push(item.user)

                    return acc
                },
                [[], []] as [ParticipantItemProps[], ParticipantItemProps[]]
            ) ?? [[], []],
        [assistants, participants]
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
        <div className={Styles.participants}>
            {connected.map((item) => (
                <ParticipantItem key={item.id} {...item} />
            ))}
            {notConnected.map((item) => (
                <ParticipantItem
                    key={item.id}
                    {...item}
                    className={Styles.disabled}
                />
            ))}
        </div>
    )
}

const ParticipantItem = ({
    audioLevel,
    isMicrophoneEnabled,
    className,
    ...rest
}: AssistantDTO["user"] &
    Partial<ReturnType<typeof useRemoteParticipants>[number]> & {
        className?: string
    }) => {
    const { displayName } = rest

    return (
        <div
            title={displayName}
            className={`${Styles.participant} ${className ?? ""}`}
        >
            <div className="flex center gap">
                <UserImage
                    {...rest}
                    className={`${audioLevel ? Styles.speaking : ""} `}
                />
                <small className={Styles.displayName}>{displayName}</small>
            </div>
            {isMicrophoneEnabled ? (
                <MicIcon
                    style={{
                        width: "min-content",
                        height: "min-content",
                    }}
                />
            ) : (
                <MicDisabledIcon
                    style={{
                        width: "min-content",
                        height: "min-content",
                        color: "var(--color-accent)",
                    }}
                />
            )}
        </div>
    )
}
type ParticipantItemProps = Parameters<typeof ParticipantItem>[0]
