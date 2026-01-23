import React from "react";
import Avatar from "./Avatar.jsx";

const TarjetaUsuario = React.memo(({ user }) => {
  console.log("TarjetaUsuario render", user.id);

  return (
    <div style={{ border: "1px solid #ccc", margin: 6, padding: 6 }}>
      <strong>{user.id}</strong> - {user.name}
      <div>{user.email}</div>
      <Avatar avatar={user.avatar} isOnline={user.isOnline} />
    </div>
  );
});

export default TarjetaUsuario;