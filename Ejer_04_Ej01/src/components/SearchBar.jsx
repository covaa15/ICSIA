import React from "react";

//Crea la barra de busqueda, que va filtrando segun vamos escribiendo
const SearchBar = ({ filtro, setFiltro }) => {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar usuario..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
