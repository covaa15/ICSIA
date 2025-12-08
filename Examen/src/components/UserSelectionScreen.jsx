import React from 'react';
// TODO: Importa el componente UserCard
import UserCard from './UserCard';

function UserSelectionScreen({ usuarios, usuarioSeleccionado }) {
  // TODO: Recibe las props adecuadas

  return (
    <div className="user-selection-container">
      <div className="user-selection-header">
        <h1>Bienvenido al Gestor de Finanzas</h1>
        <p>Por favor, selecciona un usuario para continuar</p>
      </div>
      <div className="user-selection-grid">
        {/* 
          TODO: Mapea el array de usuarios...
        */}
        {usuarios.map(usuario => (
          <UserCard key={usuario.id} usuarios={usuario} usuarioSeleccionado={usuarioSeleccionado} />
        ))}
      </div>
    </div>
  );
}

export default UserSelectionScreen;
