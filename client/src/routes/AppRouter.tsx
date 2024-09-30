import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Login } from "../pages/Login/Login"
import { Things } from "../pages/Things"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Things />} />
                <Route path="/:id" element={<Things />} />
            </Routes>
        </BrowserRouter>
    )
}
