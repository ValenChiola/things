import { useJoin, useRemoteAudioTracks, useRemoteUsers } from "agora-rtc-react"

import { useState } from "react"
import { useToken } from "./useToken"

const appid = import.meta.env.VITE_APP_AGORA_APP_ID
const token = import.meta.env.VITE_APP_AGORA_TOKEN
console.log({ appid, token })

export const useVoiceChannel = (noteId?: string) => {
    const { sub } = useToken()
    const [ready, setReady] = useState(false)
    const remoteUsers = useRemoteUsers()
    const { audioTracks } = useRemoteAudioTracks(remoteUsers)

    const { data: roomID, ...rest } = useJoin(
        {
            appid,
            token,
            uid: sub,
            channel: "Room",
        },
        !!noteId
    )

    const join = () => noteId && setReady(true)

    return {
        join,
        roomID,
        audioTracks,
        ...rest,
    }
}
