import AuthLoginPost from "./auth.login.post"
import AuthLogoutDelete from "./auth.logout.delete"
import AuthRefreshGet from "./auth.refresh.get"
import Route from "../../createVersionRoutes"
import { authorize } from "../../../infrastructure/authorize"

export const AuthRoutes: Route = {
    prefix: "auth",

    routes(server, _, done) {
        // GET
        server.get("/", authorize({ minRole: "public" }), AuthRefreshGet)

        // POST
        server.post("/login", authorize({ minRole: "public" }), AuthLoginPost)

        // DELETE
        server.delete("/", authorize({ minRole: "public" }), AuthLogoutDelete)

        done()
    },
}
