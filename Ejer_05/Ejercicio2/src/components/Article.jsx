import React from 'react';

function Articulo({ articulo, alFijar }) {
    return (
        <div
            className={`card mb-3 ${articulo.fijado ? 'border-warning shadow-lg' : 'border-secondary'}`}
        >
            <div className="card-body">
                <h5 className="card-title d-flex justify-content-between align-items-center">
                    {articulo.titulo}
                    {articulo.fijado && <span className="badge bg-warning text-dark"> Fijado</span>}
                </h5>
                <p className="card-text">Categoría: {articulo.categoria}</p>
                <button
                    className={`btn ${articulo.fijado ? 'btn-outline-warning' : 'btn-outline-secondary'}`}
                    onClick={() => alFijar(articulo.id)}
                >
                    {articulo.fijado ? 'Desfijar' : 'Fijar'}
                </button>
            </div>
        </div>
    );
}

export default Articulo;
