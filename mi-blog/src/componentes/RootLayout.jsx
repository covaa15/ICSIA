import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

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
