import { useContext } from 'react';
import { ThemeContext } from './ThemeContext.jsx';

export function ControlesTema() {

  // Saco el estado del tema y el dispatch del contexto
  const { estadoTema, dispatchTema } = useContext(ThemeContext);

  return (
    <aside className="panel-controles">
      <h2>Controles del Tema</h2>

      {/* Input para cambiar el color principal */}
      <label>Color Primario:</label>
      <input
        type="color"
        value={estadoTema.colorPrimario}
        onChange={(e) =>
          // Actualizo el color en el contexto
          dispatchTema({
            type: 'SET_COLOR_PRIMARIO',
            payload: e.target.value,
          })
        }
      />

      {/*Cambia el tamaño de la fuente */}
      <label>Tamaño de Fuente: {estadoTema.tamañoFuente}px</label>
      <input
        type="range"
        min="12"
        max="28"
        value={estadoTema.tamañoFuente}
        onChange={(e) =>
          // Actualizo el tamaño de la fuente
          dispatchTema({
            type: 'SET_TAMAÑO_FUENTE',
            payload: Number(e.target.value),
          })
        }
      />

      {/* Botones para cambiar el tipo de texto */}
      <label>Transformación de Texto:</label>
      <div className="botones-texto">

        {/* Dejo el texto normal */}
        <button onClick={() =>
          dispatchTema({ type: 'SET_TRANSFORMACION_TEXTO', payload: 'none' })
        }>
          Ninguna
        </button>

        {/* Pongo el texto en mayusculas */}
        <button onClick={() =>
          dispatchTema({ type: 'SET_TRANSFORMACION_TEXTO', payload: 'uppercase' })
        }>
          Mayúsculas
        </button>

        {/* Pongo el texto en minusculas */}
        <button onClick={() =>
          dispatchTema({ type: 'SET_TRANSFORMACION_TEXTO', payload: 'lowercase' })
        }>
          Minúsculas
        </button>

        {/* Capitalizo el texto */}
        <button onClick={() =>
          dispatchTema({ type: 'SET_TRANSFORMACION_TEXTO', payload: 'capitalize' })
        }>
          Capitalizar
        </button>
      </div>
    </aside>
  );
}
