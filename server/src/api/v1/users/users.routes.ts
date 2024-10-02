import Route from "../../createVersionRoutes"
import UsersGetNotes from "./users.get.notes"
import UsersMeGet from "./users.me.get"
import UsersPost from "./users.post"
import { authorize } from "../../../infrastructure/authorize"

export const UserRoutes: Route = {
    prefix: "users",

    routes(server, _, done) {
        // GET
        server.get("/notes", authorize({ minRole: "user" }), UsersGetNotes)
        server.get("/me", authorize({ minRole: "user" }), UsersMeGet)

        // POST
        server.post("/", UsersPost)

        done()
    },
}
