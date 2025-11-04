import React from 'react';

function BarraBusqueda({ valor, alCambiar }) {
    return (
        <div className="d-flex justify-content-center mb-3">
            <input
                type="text"
                className="form-control w-75"
                placeholder="Buscar artículo..."
                value={valor}
                onChange={(e) => alCambiar(e.target.value)}
            />
        </div>
    );
}

export default BarraBusqueda;
