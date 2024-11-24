import { Server } from "socket.io"
import { createServer } from "http"
import { jwtDecode } from "jwt-decode"
import express from "express"

export const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
    },
})

io.on("connection", (socket) => {
    const { token } = socket.handshake.auth
    if (token && typeof token === "string") {
        const { sub, noteId } = jwtDecode<TokenPayload>(token)

        const rooms = [sub, noteId].filter((item): item is string => !!item)

        socket.join(rooms)

        console.log(`${socket.id} connected to rooms: ${rooms}`)
    }

    socket.on("disconnect", () =>
        console.warn(`${socket.id} disconnected from server`)
    )
})

app.post<unknown, unknown, Event>("/send", express.json(), ({ body }, res) => {
    const { except = [], to, event, payload } = body
    io.except(except).to(to).emit(event, payload)

    res.json({ message: "Event sent", ...body })
})

interface Event {
    event: string
    payload: Record<string, unknown>
    to: string[]
    except?: string[]
}

interface TokenPayload {
    sub: string
    noteId?: string
    iat: number
    exp: number
}

server.listen(3000, () =>
    console.log("Server is running on http://localhost:3000")
)
