import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TasksContext } from "../componentes/TaskContext.jsx";

export default function NewTaskPage() {
    const navigate = useNavigate();
    const { addTask, tasks } = useContext(TasksContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            id: Date.now(),
            title: e.target.title.value,
            description: e.target.description.value,
            status: "pending"
        };

        addTask(newTask);
        navigate("/dashboard");
    };

    return (
        <>
            <h2>Nueva Tarea</h2>
            <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Título" required />
                <br />
                <textarea name="description" placeholder="Descripción" required />
                <br />
                <button type="submit">Guardar</button>
            </form>
        </>
    );
}
