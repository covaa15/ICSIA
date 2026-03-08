import { Link } from "react-router-dom";

// Componente que muestra la lista de proyectos
export default function ProjectList({ proyectos }) {
  return (
    <ul className="lista">
      {proyectos.map((proyecto) => (
        <li key={proyecto.id}>
          <Link to={`/projects/${proyecto.id}`}>
            <h3>{proyecto.nombre}</h3>
            <p>{proyecto.descripcion}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
