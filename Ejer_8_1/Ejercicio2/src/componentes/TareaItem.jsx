import { memo } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useTasks } from "./TasksContext.jsx";

//Funcion que muestra una tarea
function TareaItem({ tarea }) {
  const { usuarioActual } = useAuth();
  const { dispatch } = useTasks();

  // Compruebo si el usuario puede modificar la tarea
  const puedeEditar =
    tarea.autor === usuarioActual && usuarioActual !== "Invitado";

  return (
    <div className={`task-card ${tarea.completada ? "completed" : ""}`}>
      <span className="task-text">
        {tarea.texto} <em>(autor: {tarea.autor})</em>
      </span>

      <div className="task-actions">
        <button
          className="btn btn-complete"
          disabled={!puedeEditar}
          onClick={() => dispatch({ tipo: "COMPLETAR", payload: tarea.id })}
        >
          {tarea.completada ? "Deshacer" : "Completar"}
        </button>

        <button
          className="btn btn-delete"
          disabled={!puedeEditar}
          onClick={() => dispatch({ tipo: "ELIMINAR", payload: tarea.id })}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default memo(TareaItem);
