import React from "react"
import { Routes, BrowserRouter, Route } from "react-router-dom"
import Login from "./Components/Login/Login"
import NoPage from "./Components/NoPage/NoPage"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Login />} />
                    <Route path="signup" element={<div>Helloo</div>} />
                    <Route path="farms" element={<div>farms</div>} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default App