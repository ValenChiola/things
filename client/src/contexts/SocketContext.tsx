import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useRef,
} from "react"
import { Socket, io } from "socket.io-client"

import { useActions } from "../hooks/useActions"
import { useToken } from "../hooks/useToken"
import { useUI } from "./UIContext"

const server = import.meta.env.VITE_WEBSOCKET_URL
const disabled = true
const debug = window.location.hostname === "localhost"

const SocketsContext = createContext({} as ContextTypes)
SocketsContext.displayName = "SocketContext"

export const SocketProvider = ({ children }: PropsWithChildren) => {
    const { token } = useToken()
    const { showToast } = useUI()
    const { actionDispatcher } = useActions()
    const socket = useRef<Socket | null>(null)

    const emit = (eventName: string, payload?: Record<string, unknown>) => {
        if (!socket.current)
            throw new Error("❗ Socket connection not available.")
        return socket.current.emit(eventName, payload)
    }
    const volatileEmit = (
        eventName: string,
        payload?: Record<string, unknown>
    ) => {
        if (!socket.current)
            throw new Error("❗ Socket connection not available.")
        return socket.current.volatile.emit(eventName, payload)
    }
    /* Manage connection */
    useEffect(() => {
        if (disabled) return

        if (!server) {
            debug &&
                showToast.error("❗ Socket server not available", {
                    id: "socket-server-not-available",
                })
            return
        }

        if (!token) return

        socket.current = io(server, {
            auth: { token },
            query: {
                token,
            },
        })

        socket.current.on(
            "connect",
            () => debug && showToast.success("Connected to socket server")
        )

        socket.current.on(
            "disconnect",
            () => debug && showToast.error("Disconnected from socket server")
        )

        socket.current.onAny((event, payload) =>
            actionDispatcher({ event, payload })
        )

        return () => {
            socket.current?.disconnect()
        }
    }, [token])
    return (
        <SocketsContext.Provider
            value={{ socket: socket.current, emit, volatileEmit }}
        >
            {children}
        </SocketsContext.Provider>
    )
}

export const useSocket = () => {
    const context = useContext(SocketsContext)
    if (context === undefined) {
        throw new Error("useSocket must be used within a SocketProvider")
    }
    return context
}

interface ContextTypes {
    socket: Socket | null
    // eslint-disable-next-line no-unused-vars
    emit: (eventName: string, payload?: Record<string, unknown>) => Socket
    // eslint-disable-next-line no-unused-vars
    volatileEmit: (
        eventName: string,
        payload?: Record<string, unknown>
    ) => Socket
}
