import React from "react";

//Creamos la tarjeta Perfíl del Usuario
const ProfileCard = ({ usuario }) => {

  return (
    <div className="card">
      <div className="card-body ">
        <div className="d-flex align-items-center mb-3">
          <img
            src={usuario.avatarUrl}
            alt={usuario.nombre}
            className="rounded-circle me-3"
            width="80"
            height="80"
          />
          <div>
            <h1 className="mb-0">{usuario.nombre}</h1>
            <h6 className="text-muted">{usuario.email}</h6>
          </div>
        </div>

        <h4>Información de Contacto</h4>
        <p className="mb-1">
          <h6><strong>Calle:</strong> {usuario.direccion.calle}</h6>
        </p>
        <p>
          <h6><strong>Ciudad:</strong> {usuario.direccion.ciudad}</h6>
        </p>

        <h4 className="mt-3">Aficiones</h4>
        <div>
          {usuario.aficiones.map((aficion, index) => (
            <span key={index} className="badge bg-primary me-2">
              {aficion}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
