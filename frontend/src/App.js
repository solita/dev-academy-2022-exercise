import React from "react"
import { Routes, BrowserRouter, Route } from "react-router-dom"
import Login from "./Components/Login/Login"
import NoPage from "./Components/NoPage/NoPage"
import Signup from "./Components/Signup/Signup"
import Farms from "./Components/Farms/Farm"
import Navbar from "./Components/Navbar/Navbar"
import DataVisualization from "./Components/Farms/DataVisualization"

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact path="/" component={Login} element={<Login />} />
                    <Route path="/farms/append" element={<Farms />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/farms" element={<DataVisualization />} />
                </Routes>
            </BrowserRouter >
        </>
    )
}

export default App