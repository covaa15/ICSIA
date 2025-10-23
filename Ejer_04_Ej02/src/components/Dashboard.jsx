import React, { useState } from "react";
import ProjectColumn from "./ProjectColumn.jsx";
import { proyectos as proyectosIniciales } from "../datos/Proyectos.js";

//Creamos el componente principal del dashboard
const Dashboard = () => {
  //Creamos la lista de los proyectos con useState
  const [listaProyectos, setListaProyectos] = useState(proyectosIniciales);

  //Creamos la función que actualiza el estado del proyecto
  function handleActualizarEstado(proyectoId, nuevoEstado) {
    const proyectosActualizados = listaProyectos.map((proyecto) =>
      proyecto.id === proyectoId
        ? { ...proyecto, estado: nuevoEstado }
        : proyecto
    );
    //Actualizamos el estado con la nueva lista
    setListaProyectos(proyectosActualizados);
  }

  return (
    <div className="container mt-4">
      {/*Creamos el título principal del dashboard*/}
      <h2 className="text-center mb-4">
        <i className="bi bi-kanban me-2"></i> Dashboard de Proyectos
      </h2>

      {/*Creamos las tres columnas filtrando los proyectos según su estado*/}
      <div className="row">
        <ProjectColumn
          titulo="Pendiente"
          proyectos={listaProyectos.filter((proyecto) => proyecto.estado === "Pendiente")}
          handleActualizarEstado={handleActualizarEstado}
        />
        <ProjectColumn
          titulo="En Progreso"
          proyectos={listaProyectos.filter((proyecto) => proyecto.estado === "En Progreso")}
          handleActualizarEstado={handleActualizarEstado}
        />
        <ProjectColumn
          titulo="Completado"
          proyectos={listaProyectos.filter((proyecto) => proyecto.estado === "Completado")}
          handleActualizarEstado={handleActualizarEstado}
        />
      </div>
    </div>
  );
};

export default Dashboard;
