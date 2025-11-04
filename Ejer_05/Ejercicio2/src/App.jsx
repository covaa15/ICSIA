import React, { useState } from 'react';

import ListaArticulos from './components/ArticleList.jsx';
import BarraBusqueda from './components/SearchBar.jsx';
import EstadoVacio from './components/EmptyState.jsx';

const articulosIniciales = [
  { id: 'a1', titulo: 'React 19 ya está aquí', categoria: 'React', fijado: true },
  { id: 'a2', titulo: 'Novedades en CSS: View Transitions', categoria: 'CSS', fijado: false },
  { id: 'a3', titulo: 'State Management con Zustand', categoria: 'React', fijado: false },
  { id: 'a4', titulo: 'El futuro de JavaScript: Records y Tuples', categoria: 'JavaScript', fijado: false },
];

function App() {
  const [listaArticulos, setListaArticulos] = useState(articulosIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');

  // Filtramos por busqueda y categoria
  const articulosFiltrados = listaArticulos.filter((articulo) => {
    const coincideBusqueda = articulo.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = filtroCategoria === 'Todos' || articulo.categoria === filtroCategoria;
    return coincideBusqueda && coincideCategoria;
  });

  // Fijamos o no un articulo
  const manejarFijar = (idArticulo) => {
    setListaArticulos((anteriores) => {
      const listaArticulosActualizados = anteriores.map((articulo) => ({
        ...articulo,
        fijado: articulo.id === idArticulo ? !articulo.fijado : false,
      }));

      const articuloFijado = listaArticulosActualizados.find((articulo) => articulo.fijado);
      if (articuloFijado) {
        return [articuloFijado, ...listaArticulosActualizados.filter((articulo) => articulo.id !== articuloFijado.id)];
      }
      return listaArticulosActualizados;
    });
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Feed de Noticias</h1>

      <BarraBusqueda valor={busqueda} alCambiar={setBusqueda} />

      <div className="d-flex justify-content-center gap-2 my-3">
        {['Todos', 'React', 'CSS', 'JavaScript'].map((categoria) => (
          <button
            key={categoria}
            className={`btn ${filtroCategoria === categoria ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFiltroCategoria(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      <hr />

      {articulosFiltrados.length > 0 ? (
        <ListaArticulos articulos={articulosFiltrados} alFijar={manejarFijar} />
      ) : (
        <EstadoVacio />
      )}
    </div>
  );
}

export default App;
