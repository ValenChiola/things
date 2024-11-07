import Route from "../../createVersionRoutes"
import { authorize } from "../../../infrastructure/authorize"
import createTokenPost from "./create.token.post"

export const RoomRoutes: Route = {
    prefix: "room",

    routes(server, _, done) {
        // POST
        server.post("/token", authorize({ minRole: "user" }), createTokenPost)

        done()
    },
}
