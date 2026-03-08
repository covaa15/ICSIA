let proyectos = [
  {
    id: "p1",
    nombre: "Desarrollo de la Aplicación Móvil",
    descripcion: "Creación de una app móvil"
  }
];

let tareas = [
  { id: "t1", projectId: "p1", titulo: "Diseñar interfaz", completada: false }
];

// Obtengo todos los proyectos
export function obtenerProyectos() {
  return proyectos;
}

// Busco un proyecto por id
export function obtenerProyecto(id) {
  return proyectos.find((proyecto) => proyecto.id === id);
}

// Obtengo las tareas del proyecto
export function obtenerTareas(projectId) {
  return tareas.filter((tarea) => tarea.projectId === projectId);
}

// Creo un proyecto nuevo
export function crearProyecto(nombre, descripcion) {
  const nuevo = {
    id: Math.random().toString(),
    nombre,
    descripcion
  };

  proyectos.push(nuevo);
}

// Elimino un proyecto
export function eliminarProyecto(id) {

  // Elimino el proyecto de la lista
  proyectos = proyectos.filter((proyecto) => proyecto.id !== id);

  // Elimino las tareas del proyecto
  tareas = tareas.filter((tarea) => tarea.projectId !== id);
}

// Creo una tarea
export function crearTarea(projectId, titulo) {
  tareas.push({
    id: Math.random().toString(),
    projectId,
    titulo,
    completada: false
  });
}

// Cambio el estado de la tarea
export function toggleTarea(id) {

  const tarea = tareas.find((tarea) => tarea.id === id);

  // Cambio completada a true o false
  tarea.completada = !tarea.completada;
}

// Elimino una tarea
export function eliminarTarea(id) {
  tareas = tareas.filter((tarea) => tarea.id !== id);
}
