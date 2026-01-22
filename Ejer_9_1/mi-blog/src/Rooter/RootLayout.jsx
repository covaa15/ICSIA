import { Outlet } from "react-router-dom";
import Navbar from "../componentes/Navbar.jsx";

export default function RootLayout() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
}
