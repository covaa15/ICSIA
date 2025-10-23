import React from "react";
import ProjectCard from "./ProjectCard.jsx";

//Creamos el componente para cada columna del dashboard
const ProjectColumn = ({ titulo, proyectos, handleActualizarEstado }) => {
  return (
    <div className="col-md-4">
      {/*Creamos la tarjeta que representa una columna*/}
      <div className="card bg-light border-0 shadow-sm mb-4">
        <div className="card-header text-center fw-bold fs-5">{titulo}</div>

        {/*Mostramos los proyectos o un mensaje si no hay*/}
        <div className="card-body">
          {proyectos.length === 0 ? (
            <p className="text-muted text-center">No hay proyectos</p>
          ) : (
            proyectos.map((proyecto) => (
              <ProjectCard
                key={proyecto.id}
                proyecto={proyecto}
                handleActualizarEstado={handleActualizarEstado}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectColumn;
