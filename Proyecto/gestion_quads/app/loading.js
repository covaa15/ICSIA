//Esta funcion muestra un mensaje mientrar la pagina esta cargando
export default function Cargando() {
  return (
    <main className="spinner-contenedor">
      <div className="spinner" />
      <p className="spinner-texto">Cargando...</p>
    </main>
  );
}