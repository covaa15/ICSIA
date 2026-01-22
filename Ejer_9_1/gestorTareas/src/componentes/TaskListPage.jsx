import { Link } from "react-router-dom";
import { useContext } from "react";
import { TasksContext } from "../componentes/TaskContext.jsx";

export default function TaskListPage() {
  const { tasks: tareas } = useContext(TasksContext);

  return (
    <>
      <h2>Lista de tareas</h2>
      <ul>
        {tareas.map(tarea => (
          <li key={tarea.id}>
            <Link to={`/dashboard/task/${tarea.id}`}>
              {tarea.title} ({tarea.status})
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
