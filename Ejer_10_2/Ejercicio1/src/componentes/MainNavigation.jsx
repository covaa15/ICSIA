import { NavLink } from "react-router-dom";

export default function MainNavigation() {
  return (
    <header className="nav">
      <nav>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/projects">Proyectos</NavLink>
        <NavLink to="/projects/new">Nuevo Proyecto</NavLink>
      </nav>
    </header>
  );
}
