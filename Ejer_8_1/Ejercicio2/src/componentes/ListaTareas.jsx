import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useTasks } from "./TasksContext.jsx";
import TareaItem from "./TareaItem.jsx";

// Funcion que muestra la lista de tareas
function ListaTareas() {
  const { usuarioActual } = useAuth();
  const { tareas, dispatch } = useTasks();

  // Estado para  la nueva tarea
  const [texto, setTexto] = useState("");

  // Comopruebo de que tipo de usuario se rata ya que los invitados no pueden crear tareas
  const puedeAgregar = usuarioActual !== "Invitado";

  function agregarTarea() {
    if (!texto.trim()) return;

    // Creo una tarea nueva con el usuario como autor
    dispatch({
      tipo: "AGREGAR",
      payload: {
        id: Date.now(),
        texto,
        autor: usuarioActual,
        completada: false,
      },
    });

    setTexto("");
  }

  return (
<>
  <div className="input-container">
    <input
      className="task-input"
      value={texto}
      disabled={!puedeAgregar}
      onChange={e => setTexto(e.target.value)}
      placeholder="Nueva tarea..."
    />
    <button className="btn btn-add" disabled={!puedeAgregar} onClick={agregarTarea}>
      Añadir
    </button>
  </div>

  <h2 className="section-title">Tareas Pendientes</h2>

  <div className="task-list">
    {tareas.map(tarea => (
      <TareaItem key={tarea.id} tarea={tarea} />
    ))}
  </div>
</>
  );
}

export default ListaTareas;
