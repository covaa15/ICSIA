import { createContext, useState } from "react";
import { TASKS as tareasIniciales } from "../data/tareas";

export const TasksContext = createContext();

export function TasksProvider({ children }) {
    const [tareas, setTasks] = useState(tareasIniciales);

    const addTask = (tarea) => {
        setTasks([...tareas, tarea]);
    };

    const deleteTask = (id) => {
        setTasks(tareas.filter(tarea => tarea.id !== id));
    };

    return (
        <TasksContext.Provider value={{ tasks: tareas, addTask, deleteTask }}>
            {children}
        </TasksContext.Provider>
    );
}
