import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Login } from "../pages/Login/Login"
import { NotFound } from "../pages/NotFound"
import { Things } from "../pages/Things/Things"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="/" element={<Things />} />
                <Route path="/:id" element={<Things />} />
            </Routes>
        </BrowserRouter>
    )
}
