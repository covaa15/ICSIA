import React from "react";
import TeamMemberList from "./TeamMemberList.jsx";

//Creamos el componente que muestra la información de un proyecto
const ProjectCard = ({ proyecto, handleActualizarEstado }) => {
  const { id, titulo, descripcion, responsables, prioridad, estado } = proyecto;

  //Creamos los colores para cada nivel de prioridad
  const colorPrioridad = {
    Alta: "danger",
    Media: "warning",
    Baja: "success",
  }[prioridad];

  //Creamos la lista de estados posibles a los que se puede mover el proyecto
  const opcionesEstado = ["Pendiente", "En Progreso", "Completado"].filter(
    (e) => e !== estado
  );

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        {/*Creamos el encabezado con el título y la prioridad*/}
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{titulo}</h5>
          <span className={`badge bg-${colorPrioridad}`}>{prioridad}</span>
        </div>

        {/*Mostramos la descripción*/}
        <p className="card-text">{descripcion}</p>

        {/*Mostramos la lista de responsables*/}
        <p className="fw-bold mb-1">Responsables:</p>
        <TeamMemberList responsables={responsables} />

        {/*Creamos el select para cambiar el estado*/}
        <div className="mt-3">
          <select
            className="form-select"
            onChange={(e) => handleActualizarEstado(id, e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Mover a
            </option>
            {opcionesEstado.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
