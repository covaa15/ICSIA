import React from 'react';

const Filtros = ({ filtro, setFiltro }) => {
  const opciones = ['todas', 'alta', 'media', 'baja'];

  return (
    <div className="d-flex justify-content-center mb-4">
      {opciones.map((opcion) => (
        <button
          key={opcion}
          className={`btn mx-1 ${
            filtro === opcion ? 'btn-primary' : 'btn-outline-primary'
          }`}
          onClick={() => setFiltro(opcion)}
        >
          {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Filtros;
