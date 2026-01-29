import { useAuth } from "./AuthContext.jsx";

// Funcion que muestra el usuario que esta logueado
function UserInfo() {
  const { usuarioActual } = useAuth();

  return <div className="user-info">Usuario: {usuarioActual}</div>;
}

export default UserInfo;
