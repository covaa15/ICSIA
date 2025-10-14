import React from "react";

const Contacto = () => {
  return (
    <div className="container my-5">
      <h3 className="text-success mb-4">Solicita más información</h3>
      <form>
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input type="text" className="form-control" placeholder="Tu nombre" />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input type="email" className="form-control" placeholder="nombre@ejemplo.com" />
        </div>
        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea className="form-control" rows="4" placeholder="Escribe tu consulta aquí..."></textarea>
        </div>
        <button type="submit" className="btn btn-success">Enviar solicitud</button>
      </form>
    </div>
  );
};

export default Contacto;
