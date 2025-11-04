import React from 'react';

const coloresPrioridad = {
    alta: 'bg-danger',
    media: 'bg-warning',
    baja: 'bg-success'
};

const Tarea = ({ tarea, cambiarEstadoTarea }) => {
    const { id, texto, completada, prioridad } = tarea;

    return (
        <div
            className={`list-group-item d-flex align-items-center justify-content-between ${completada ? 'bg-light text-decoration-line-through' : ''
                }`}
        >
            <div className="d-flex align-items-center">
                <span
                    className={`me-3 rounded-circle ${coloresPrioridad[prioridad]}`}
                    style={{ width: '15px', height: '15px', display: 'inline-block' }}
                ></span>

                <span
                    role="button"
                    onClick={() => cambiarEstadoTarea(id)}
                    className="fw-medium"
                >
                    {texto}
                </span>
            </div>
            <small className="text-muted text-capitalize">Prioridad: {prioridad}</small>
        </div>
    );
};

export default Tarea;
