import { memo, useContext, useMemo } from 'react';
import { ThemeContext } from './ThemeContext.jsx';

export const CardPreview = memo(() => {

  // Cojo el estado del tema
  const { estadoTema } = useContext(ThemeContext);

  // Calculo el color de la sombra a partir del color principal
  const colorSombra = useMemo(() => {
    return estadoTema.colorPrimario + '99';
  }, [estadoTema.colorPrimario]);

  return (
    <div
      className="card-preview"
      style={{
        backgroundColor: estadoTema.colorPrimario,
        boxShadow: `0 10px 30px ${colorSombra}`,
        fontSize: estadoTema.tamañoFuente,
        textTransform: estadoTema.transformacionTexto,
      }}
    >
      <p>Esta es una tarjeta con estilos de tema.</p>
      <small>Un texto más pequeño.</small>
    </div>
  );
});
