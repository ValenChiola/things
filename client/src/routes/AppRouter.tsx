import { BrowserRouter, Route, Routes } from "react-router-dom"

import { App } from "../App"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/:id" element={<App />} />
            </Routes>
        </BrowserRouter>
    )
}
