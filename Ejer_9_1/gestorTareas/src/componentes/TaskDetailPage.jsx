import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TasksContext } from "../componentes/TaskContext.jsx";

export default function TaskDetailPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks, deleteTask } = useContext(TasksContext);

  const task = tasks.find(t => t.id === Number(taskId));

  if (!task) return <h2>Tarea no encontrada</h2>;

  const handleDelete = () => {
    deleteTask(task.id);
    navigate("/dashboard", { replace: true });
  };

  return (
    <>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Estado: {task.status}</p>

      <button onClick={handleDelete}>Borrar</button>
    </>
  );
}
