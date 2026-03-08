import { useLoaderData } from "react-router-dom";
import { obtenerProyectos } from "../utils/api.js";
import ProjectList from "../componentes/ProjectList.jsx";

// Cargo los proyectos antes de mostrar la pagina
export function loader() {
  return obtenerProyectos();
}

export default function ProjectsPage() {

  // Obtengo los datos que devuelve el loader
  const proyectos = useLoaderData();

  return (
    <div className="card">
      <h2>Tus Proyectos</h2>

      <ProjectList proyectos={proyectos} />
    </div>
  );
}
