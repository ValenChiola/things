import NotesDelete from "./notes.delete"
import NotesGetOne from "./notes.get.one"
import NotesPatch from "./notes.patch"
import NotesPost from "./notes.post"
import NotesPostAssistant from "./notes.post.assistant"
import Route from "../../createVersionRoutes"
import { authorize } from "../../../infrastructure/authorize"

export const NoteRoutes: Route = {
    prefix: "notes",

    routes(server, _, done) {
        // GET
        server.get("/:id", authorize({ minRole: "user" }), NotesGetOne)

        // POST
        server.post("/", authorize({ minRole: "user" }), NotesPost)
        server.post(
            "/assistant",
            authorize({ minRole: "user" }),
            NotesPostAssistant
        )

        // PATCH
        server.patch("/:id", authorize({ minRole: "user" }), NotesPatch)

        // DELETE
        server.delete("/:id", authorize({ minRole: "user" }), NotesDelete)

        done()
    },
}
