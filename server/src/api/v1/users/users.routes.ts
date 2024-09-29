import Route from "../../createVersionRoutes"
import UsersGetNotes from "./users.get.notes"
import UsersPost from "./users.post"
import { authorize } from "../../../infrastructure/authorize"

export const UserRoutes: Route = {
    prefix: "users",

    routes(server, _options, done) {
        // GET
        server.get(
            "/notes",
            authorize({
                minRole: "user",
            }),
            UsersGetNotes
        )

        // POST
        server.post("/", UsersPost)

        done()
    },
}
