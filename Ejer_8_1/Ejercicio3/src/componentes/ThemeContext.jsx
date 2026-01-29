import { createContext, useReducer } from 'react';

// Creo el contexto para guardar el tema de la aplicación
export const ThemeContext = createContext();

// Estado inicial del tema
const estadoInicial = {
  colorPrimario: '#6c5ce7',     
  tamañoFuente: 16,              
  transformacionTexto: 'none',   
};

// Funcion que se encarga de cambiar el tema
function themeReducer(estado, accion) {
  switch (accion.type) {

    // Cambio el color principal
    case 'SET_COLOR_PRIMARIO':
      return { ...estado, colorPrimario: accion.payload };

    // Cambio el tamaño de la fuente
    case 'SET_TAMAÑO_FUENTE':
      return { ...estado, tamañoFuente: accion.payload };

    // Cambio la transformación del texto
    case 'SET_TRANSFORMACION_TEXTO':
      return { ...estado, transformacionTexto: accion.payload };

    // Si no entra en ningún caso, dejo el estado igual
    default:
      return estado;
  }
}

export function ThemeProvider({ children }) {

  // Guardo el estado del tema y el dispatch
  const [estadoTema, dispatchTema] = useReducer(themeReducer, estadoInicial);

  return (
    // Paso el estado y el dispatch a los componentes hijos
    <ThemeContext.Provider value={{ estadoTema, dispatchTema }}>
      {children}
    </ThemeContext.Provider>
  );
}
