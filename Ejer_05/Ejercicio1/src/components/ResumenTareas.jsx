import React from 'react';

const ResumenTareas = ({ tareasFiltradas, total }) => {
  if (tareasFiltradas.length === 0) {
    return <p className="text-center text-muted">No hay tareas para este filtro.</p>;
  }

  const todasCompletas = tareasFiltradas.every((tarea) => tarea.completada);

  return (
    <div className="text-center">
      {todasCompletas ? (
        <p className="text-success fw-bold">
          ¡Felicidades! Has completado todas las tareas de esta sección. 
        </p>
      ) : (
        <p>
          Mostrando <strong>{tareasFiltradas.length}</strong> de{' '}
          <strong>{total}</strong> tareas.
        </p>
      )}
    </div>
  );
};

export default ResumenTareas;
