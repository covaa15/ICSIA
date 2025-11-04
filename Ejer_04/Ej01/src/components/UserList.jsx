import React from "react";

//Creamos la lista de los usuarios
const UserList = ({ usuarios, onSeleccionarUsuario }) => {
  return (
    <ul className="list-group">
      {usuarios.map((usuario) => (
        <li
          key={usuario.id}
          className="list-group-item list-group-item-action"
          onClick={() => onSeleccionarUsuario(usuario.id)}
         
        >
          <h6>{usuario.nombre}</h6>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
