import React, { useState } from "react";
import { usuarios } from "./datos/Usuarios.js";
import UserList from "./components/UserList.jsx";
import ProfileCard from "./components/ProfileCard.jsx";
import SearchBar from "./components/SearchBar.jsx";

function App() {

  //Constante que almacena el ID del usuario Seleccionado
  const [usuarioSeleccionadoId, setUsuarioSeleccionadoId] = useState(null);

   //Constante que almacena  el texto del filtro de búsqueda
  const [filtro, setFiltro] = useState("");

  //Busco los usuarios cuyo texto coincide con los de la barra de busqueda
  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().startsWith(filtro.toLowerCase())
  );

  //Busco el usuario cuya ID coincide con la del Usuario Seleccionado
  const usuarioSeleccionado = usuarios.find(
    (usuario) => usuario.id === usuarioSeleccionadoId
  );

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h4>Gestor de Perfiles de Usuario</h4>
        </div>
        <div className="card-body row">
          <div className="col-md-4 border-end">
            <h4>Lista de Usuarios</h4>
            <SearchBar filtro={filtro} setFiltro={setFiltro} />
            <UserList
              usuarios={usuariosFiltrados}
              onSeleccionarUsuario={setUsuarioSeleccionadoId}
            />
          </div>

          <div className="col-md-8 ">
            {usuarioSeleccionado ? (
              <ProfileCard usuario={usuarioSeleccionado} />
            ) : (
              <p className="text-muted mt-4 ">
                Selecciona un usuario para ver los detalles.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
