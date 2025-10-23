import React from "react";

//Creamos el componente que muestra los nombres de los responsables
const TeamMemberList = ({ responsables }) => {
  return (
    <div>
      {responsables.map((persona) => (
        <span key={persona.id} className="badge bg-info text-dark me-2">
          {persona.nombre}
        </span>
      ))}
    </div>
  );
};

export default TeamMemberList;
