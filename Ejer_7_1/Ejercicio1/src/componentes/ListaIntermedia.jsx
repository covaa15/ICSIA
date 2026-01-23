import React from "react";
import TarjetaUsuario from "./TarjetaUsuario.jsx";

const ListaIntermedia = React.memo(({ users }) => {
  console.log("ListaIntermedia render");

  return (
    <div>
      {users.map(user => (
        <TarjetaUsuario key={user.id} user={user} />
      ))}
    </div>
  );
});

export default ListaIntermedia;