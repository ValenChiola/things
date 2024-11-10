import Axios from "axios"
import { log } from "../logger"

const { WEBSOCKET_URL } = process.env

const SocketApi = Axios.create({
    baseURL: WEBSOCKET_URL,
})

export const sendEvent = (event: Event) =>
    SocketApi.post("/send", event).catch((error) => log.error(error))

interface Event {
    event: string
    payload: Record<string, unknown>
    to: string[]
    except?: string[]
}
