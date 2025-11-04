import React from 'react';

function EstadoVacio() {
    return (
        <div className="alert alert-info text-center mt-4" role="alert">
            No se encontraron artículos con los filtros seleccionados.
        </div>
    );
}

export default EstadoVacio;
