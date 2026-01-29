import { useAuth } from "./AuthContext.jsx";

// Funcion que comprueba el cambio de usuario en le select
function SelectorUsuario() {
  const { usuarioActual, setUsuarioActual } = useAuth();

  return (
    <select className="user-select" value={usuarioActual} onChange={e => setUsuarioActual(e.target.value)}>
      <option value="Ana">Ana</option>
      <option value="Luis">Luis</option>
      <option value="Invitado">Invitado</option>
    </select>
  );
}

export default SelectorUsuario;

