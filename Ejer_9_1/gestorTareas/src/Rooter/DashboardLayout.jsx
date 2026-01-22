import { Outlet, NavLink } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <aside>
        <h3>Dashboard</h3>
        <nav>
          <NavLink to="/dashboard">Ver Tareas</NavLink><br />
          <NavLink to="/dashboard/new">Añadir Tarea</NavLink>
        </nav>
      </aside>

      <section>
        <Outlet />
      </section>
    </div>
  );
}
