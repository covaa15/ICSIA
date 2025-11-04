import React, { useState } from 'react';
import tareasIniciales from './datos/Tareas.js';
import Filtros from './components/Filtros.jsx';
import ListaTareas from './components/ListasTareas.jsx';
import ResumenTareas from './components/ResumenTareas.jsx';

const App = () => {
  const [tareas, setTareas] = useState(tareasIniciales);
  const [filtro, setFiltro] = useState('todas');

  const cambiarEstadoTarea = (id) => {
    const nuevasTareas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    setTareas(nuevasTareas);
  };

  const tareasFiltradas =
    filtro === 'todas'
      ? tareas
      : tareas.filter((tarea) => tarea.prioridad === filtro);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Dashboard de Tareas</h1>

      <Filtros filtro={filtro} setFiltro={setFiltro} />

      <ListaTareas tareas={tareasFiltradas} cambiarEstadoTarea={cambiarEstadoTarea} />

      <ResumenTareas tareasFiltradas={tareasFiltradas} total={tareas.length} />
    </div>
  );
};

export default App;
