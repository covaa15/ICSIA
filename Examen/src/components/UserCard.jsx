import React from 'react';

function UserCard({ usuarios, usuarioSeleccionado }) {
  // TODO: Recibe las props adecuadas
  
  return (
    <div className="user-card">
      {/* TODO: Muestra la foto del usuario */}
      <img src={usuarios.foto} className="user-photo" />
      <div className="user-card-info">
        {/* TODO: Muestra el nombre y la dirección del usuario */}
        <h3>{usuarios.nombre}</h3>
        <p>{usuarios.direccion}</p>
      </div>
      {/* TODO: Llama a la función adecuada al hacer clic */}
      <button className="user-select-btn" onClick={() => usuarioSeleccionado(usuarios)}>
        Acceder
      </button>
    </div>
  );
}

export default UserCard;





