import { useState, useCallback } from "react";
import ContenedorToast from "./componentes/ToatsContainer.jsx";
import "./css/style.css";

const ERRORES_POSIBLES = [
  { message: "No se pudo cargar el usuario" },
  { message: "Error 500 del servidor" },
  { message: "Permiso denegado" },
  { message: "Sesión expirada" },
  { message: "Error desconocido" }
];

export default function App() {
  const [errores, setErrores] = useState([]);

  const agregarError = () => {
    const error =
      ERRORES_POSIBLES[Math.floor(Math.random() * ERRORES_POSIBLES.length)];

    setErrores(prev => [
      ...prev,
      { id: Date.now(), message: error.message }
    ]);
  };

  const borrarError = useCallback((id) => {
    setErrores(prev => prev.filter(error => error.id !== id));
  }, []);

  const limpiarTodosLosErrores = () => {
    setErrores([]);
  };

  return (
    <div className="app">
      <div className="panel">
        <h1>Ejercicio 3</h1>

        <div className="botones">
          <button className="btn btn-agregar" onClick={agregarError}>
            Añadir error
          </button>
          <button className="btn btn-limpiar" onClick={limpiarTodosLosErrores}>
            Limpiar todos
          </button>
        </div>
      </div>

      <ContenedorToast errores={errores} borrarError={borrarError} />
    </div>
  );
}
