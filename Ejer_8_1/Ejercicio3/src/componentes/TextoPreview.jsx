import { memo, useContext } from 'react';
import { ThemeContext } from './ThemeContext.jsx';

export const TextoPreview = memo(() => {

  const { estadoTema } = useContext(ThemeContext);

  return (
    <p
      style={{
        fontSize: estadoTema.tamañoFuente,
        textTransform: estadoTema.transformacionTexto,
        color: estadoTema.colorPrimario,
      }}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
  );
});
