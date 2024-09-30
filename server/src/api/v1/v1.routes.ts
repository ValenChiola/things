import { AuthRoutes } from "./auth/auth.routes"
import { NoteRoutes } from "./notes/notes.routes"
import { UserRoutes } from "./users/users.routes"
import { createVersionRoute } from "../createVersionRoutes"

export const V1Routes = createVersionRoute("v1", [
    AuthRoutes,
    NoteRoutes,
    UserRoutes,
])
