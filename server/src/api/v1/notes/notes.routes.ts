import NotesDelete from "./notes.delete"
import NotesPatch from "./notes.patch"
import NotesPost from "./notes.post"
import Route from "../../createVersionRoutes"
import { authorize } from "../../../infrastructure/authorize"

export const NoteRoutes: Route = {
    prefix: "notes",

    routes(server, _options, done) {
        // POST
        server.post("/", authorize({ minRole: "user" }), NotesPost)

        // PATCH
        server.patch("/:id", authorize({ minRole: "user" }), NotesPatch)

        // DELETE
        server.delete("/:id", authorize({ minRole: "user" }), NotesDelete)

        done()
    },
}
