import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
    return (
        <>
            <header>
                <nav>
                    <NavLink to="/">Inicio</NavLink>
                    <NavLink to="/dashboard">Panel de Tareas</NavLink>
                    <NavLink to="/profile">Perfil</NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
}
