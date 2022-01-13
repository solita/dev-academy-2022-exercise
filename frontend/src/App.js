import React from "react"
import { Routes, BrowserRouter, Route } from "react-router-dom"
import Login from "./Components/Login/Login"
import NoPage from "./Components/NoPage/NoPage"
import Signup from "./Components/Signup/Signup"
import Farms from "./Components/Farms/Farm"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={"/"}>
                    <Route index element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="farms" element={<Farms />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default App