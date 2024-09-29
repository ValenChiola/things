import { NoteRoutes } from "./notes/notes.routes"
import { UserRoutes } from "./users/users.routes"
import { createVersionRoute } from "../createVersionRoutes"

export const V1Routes = createVersionRoute("v1", [NoteRoutes, UserRoutes])
