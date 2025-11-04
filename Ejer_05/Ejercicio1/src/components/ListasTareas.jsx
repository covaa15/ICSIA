import React from 'react';
import Tarea from './Tarea.jsx'

const ListaTareas = ({ tareas, cambiarEstadoTarea }) => {
    return (
        <div className="list-group mb-4">
            {tareas.map((tarea) => (
                <Tarea
                    key={tarea.id}
                    tarea={tarea}
                    cambiarEstadoTarea={cambiarEstadoTarea}
                />
            ))}
        </div>
    );
};

export default ListaTareas;
