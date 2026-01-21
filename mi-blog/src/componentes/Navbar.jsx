import { NavLink } from "react-router-dom";
import "../css/Nav.css";
export default function Navbar() {
    return (
        <nav>
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? "active" : ""}
            >
                Inicio
            </NavLink>

            <NavLink
                to="/posts"
                className={({ isActive }) => isActive ? "active" : ""}
            >Post
            </NavLink>
        </nav>
    );
};
