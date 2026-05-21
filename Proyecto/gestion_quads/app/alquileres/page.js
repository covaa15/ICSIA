import Link from "next/link";
import { obtenerAlquileres } from "@/Funciones/funcionesMySQL";
 
export default async function Page({ searchParams }) {
  const alquileres = await obtenerAlquileres();
 
  // Recojo los filtros de la URL
  const params = await searchParams;

  const filtroBusqueda = params?.busqueda?.toLowerCase() || "";
  const filtroEstado = params?.estado    || "";

 
  const ahora = new Date();
 
  // Filtro por texto y por estado activo/finalizado
  const alquileresFiltrados = alquileres.filter((alquiler) => {
    const coincideBusqueda =
      !filtroBusqueda ||
      alquiler.marca?.toLowerCase().includes(filtroBusqueda) ||
      alquiler.nombre?.toLowerCase().includes(filtroBusqueda);
 
    // El alquiler esta activo si su fecha de fin no ha pasado
    const activo = new Date(alquiler.fechaFin) >= ahora;
    const coincideEstado =
      !filtroEstado ||
      (filtroEstado === "activo"     &&  activo) ||
      (filtroEstado === "finalizado" && !activo);
 
    return coincideBusqueda && coincideEstado;
  });
 
  return (
    <main>
      <Link href="/" className="volver">← Volver a Inicio</Link>
      <h1>Alquileres</h1>
      <Link href="/alquileres/nuevoAlquiler" className="nuevo">+ Nuevo Alquiler</Link>
 
      <form method="GET" className="filtros-inline">
        <input
          name="busqueda"
          placeholder="Buscar por quad o cliente..."
          defaultValue={params?.busqueda || ""}
          className="filtro-input"
        />
        <select name="estado" defaultValue={params?.estado || ""} className="filtro-select">
          <option value="">Todos los estados</option>
          <option value="activo">Activos</option>
          <option value="finalizado">Finalizados</option>
        </select>
        <button type="submit" className="filtro-btn">Filtrar</button>
        <Link href="/alquileres" className="filtro-limpiar">Limpiar</Link>
      </form>
 
      {alquileresFiltrados.length === 0 && (
        <p className="vacio">No hay alquileres </p>
      )}
 
      <div className="listado">
        {alquileresFiltrados.map((alquiler) => {
          const activo = new Date(alquiler.fechaFin) >= ahora;
          return (
            <div key={alquiler.idAlquiler} className="item">
              <h3>Alquiler #{alquiler.idAlquiler}</h3>
              <p><strong>Quad:</strong> {alquiler.marca}</p>
              {/*Cuando hago clic en el nombre del cliente voy directo al cliente */}
              <p><strong>Cliente: </strong>
                <Link href={`/clientes/${alquiler.idCliente}`}>{alquiler.nombre}</Link>
              </p>
              <p><strong>Inicio:</strong> {new Date(alquiler.fechaInicio).toLocaleDateString("es-ES", { timeZone: "UTC" })}</p>
              <p><strong>Fin:</strong>    {new Date(alquiler.fechaFin).toLocaleDateString("es-ES", { timeZone: "UTC" })}</p>
              <p><strong>Precio:</strong> {alquiler.precioFinal}€</p>
 
              
              <span className={`badge ${activo ? "badge-verde" : "badge-gris"}`}>
                {activo ? "Activo" : "Finalizado"}
              </span>
              <br />
              <Link href={`/alquileres/${alquiler.idAlquiler}`}>Ver detalles</Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}