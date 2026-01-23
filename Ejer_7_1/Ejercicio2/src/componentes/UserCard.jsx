import { memo } from "react";

const UserCard = memo(function UserCard({ usuario }) {
  return (
    <div className="card">
      <h3>{usuario.nombre}</h3>
      <p>{usuario.email}</p>
      <small>{usuario.empresa}</small>
    </div>
  );
});

export default UserCard;
