import UserCard from "./UserCard.jsx";

export default function UserList({ usuarios }) {
  return (
    <div className="grid">
      {usuarios.map(usuario => (
        <UserCard key={usuario.id} usuario={usuario} />
      ))}
    </div>
  );
}
