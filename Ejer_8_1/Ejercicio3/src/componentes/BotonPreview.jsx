import { memo, useContext } from 'react';
import { ThemeContext } from './ThemeContext.jsx';

export const BotonPreview = memo(() => {

  const { estadoTema } = useContext(ThemeContext);

  return (
    <button
      className="boton-preview"
      style={{
        backgroundColor: estadoTema.colorPrimario,
        fontSize: estadoTema.tamañoFuente,
        textTransform: estadoTema.transformacionTexto,
      }}
    >
      Haz Clic
    </button>
  );
});
