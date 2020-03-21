import React from "react"
import {NavLink} from "react-router-dom";

const Navbar: React.FC = () => (
    <nav className='navbar navbar-dark navbar-expand-lg bg-primary justify-content-start'>
        <div className='navbar-brand mr-5'>
            Note App
        </div>
        <ul className="navbar-nav flex-row justify-content-start">
            <li className="nav-item mr-3">
                <NavLink className="nav-link"
                         to="/" exact
                >Главная</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link"
                         to="/about"
                >Информация</NavLink>
            </li>
        </ul>
    </nav>
)

export default Navbar;
