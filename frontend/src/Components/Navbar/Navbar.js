import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"

function Navbar() {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <NavLink exact to ="/farms" className="nav-logo">
                        Farmy
                    </NavLink>
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-links">
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/farms/append" className="nav-links">
                                Farms
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/signup" className="nav-links">
                                Signup
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
