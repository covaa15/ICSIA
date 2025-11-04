import React from 'react';
import Articulo from './Article.jsx';

function ListaArticulos({ articulos, alFijar }) {
    return (
        <div>
            {articulos.map((articulo) => (
                <Articulo key={articulo.id} articulo={articulo} alFijar={alFijar} />
            ))}
        </div>
    );
}

export default ListaArticulos;
