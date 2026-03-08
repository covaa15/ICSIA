import { Outlet } from "react-router-dom";
import MainNavigation from "../componentes/MainNavigation.jsx";

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className="contenedor">
        <Outlet />
      </main>
    </>
  );
}
