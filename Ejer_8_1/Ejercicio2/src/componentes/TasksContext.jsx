import { createContext, useContext, useReducer } from "react";

// Contexto que se encarga de las tareas
const TasksContext = createContext();

// Estado inicial con algunas tareas
const estadoInicial = [
  { id: 1, texto: "Configurar el entorno", autor: "Ana", completada: false },
  { id: 2, texto: "Crear AuthContext", autor: "Ana", completada: false },
  { id: 3, texto: "Hacer el reducer", autor: "Luis", completada: false },
  { id: 4, texto: "Optimizar con memo", autor: "Luis", completada: false },
];

// Funcion que controla los cambios de las tareas
function tareasReducer(estado, accion) {
  switch (accion.tipo) {
    case "AGREGAR":
      // Añado una tarea nueva
      return [...estado, accion.payload];

    case "COMPLETAR":
      // Marco o desmarco una tarea
      return estado.map(t =>
        t.id === accion.payload ? { ...t, completada: !t.completada } : t
      );

    case "ELIMINAR":
      // Elimino una tarea
      return estado.filter(t => t.id !== accion.payload);

    default:
      return estado;
  }
}

export function TasksProvider({ children }) {

  const [tareas, dispatch] = useReducer(tareasReducer, estadoInicial);

  return (
    <TasksContext.Provider value={{ tareas, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}
