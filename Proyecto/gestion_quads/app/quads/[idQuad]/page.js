import Link from "next/link";
import { obtenerQuad, eliminarQuad, obtenerAlquileres } from "@/Funciones/funcionesMySQL.js";
import { redirect, notFound } from "next/navigation";
import BotonBorrar from "../../componentes/BotonBorrar.js";

async function borrar(idQuad) {
  "use server";

  // Compruebo si el quad tiene algún alquiler activo
  const todos = await obtenerAlquileres();
  const ahora = new Date();
  const activo = todos.some(
    alquiler => alquiler.idQuad === Number(idQuad) && new Date(alquiler.fechaFin) >= ahora
  );

  if (activo) {
    redirect(`/quads/${idQuad}?error=activo`);
  }

  await eliminarQuad(idQuad);
  redirect("/quads");
}

const mensajes = {
  activo: "No puedes eliminar este quad porque tiene alquileres activos.",
};

export default async function Page({ params, searchParams }) {

  const { idQuad } = await params;
  const sp = await searchParams;

  const quad = await obtenerQuad(idQuad);
  if (!quad) notFound();

  const error = sp?.error || null;
  const filtro = sp?.filtro || "todos";

  const todosAlquileres = await obtenerAlquileres();
  const ahora = new Date();

  // Filtro los alquileres de este quad segun el filtro seleccionado
  const alquileresQuad = todosAlquileres
    .filter(alquiler => alquiler.idQuad === quad.idQuad)
    .filter(alquiler => {
      if (filtro === "activos") return new Date(alquiler.fechaFin) >= ahora;
      if (filtro === "pasados") return new Date(alquiler.fechaFin) < ahora;
      return true;
    });

  return (
    <main>
      <Link href="/quads" className="volver">← Volver a Quads</Link>
      <h1>{quad.marca} {quad.modelo}</h1>

      {error && (
        <div className="alerta-error">
          <span>{mensajes[error] || "Ha ocurrido un error."}</span>
          <Link href={`/quads/${quad.idQuad}`} className="alerta-cerrar">✕</Link>
        </div>
      )}

      <div className="detalle">
        {quad.imagen && (
          <img src={quad.imagen} alt={`${quad.marca} ${quad.modelo}`} />
        )}
        <p><strong>Matricula:</strong> {quad.matricula}</p>
        <p><strong>Precio/día:</strong> {quad.precioDia}€</p>
        <p>
          <strong>Estado: </strong>
          <span className={`badge ${quad.estado === "Disponible" ? "badge-verde" : "badge-amarillo"}`}>
            {quad.estado}
          </span>
        </p>

        <Link href={`/quads/${quad.idQuad}/editarQuad`} className="btn-detalle">Editar</Link>
        <br /><br />

        <form action={borrar.bind(null, quad.idQuad)}
          style={{ margin: 0, padding: 0, boxShadow: "none", background: "none" }}>
          <BotonBorrar mensaje="¿Seguro que quieres eliminar este Quad?" className="eliminar">
                  Eliminar Quad
                </BotonBorrar>
        </form>
      </div>

      <h2 style={{ marginTop: "40px" }}>Historial de Alquileres</h2>

      {/* Filtros del historial */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <Link href={`/quads/${quad.idQuad}`}
          className={filtro === "todos" ? "filtro-activo" : "filtro-inactivo"}>
          Todos
        </Link>
        <Link href={`/quads/${quad.idQuad}?filtro=activos`}
          className={filtro === "activos" ? "filtro-activo" : "filtro-inactivo"}>
          Pendientes
        </Link>
        <Link href={`/quads/${quad.idQuad}?filtro=pasados`}
          className={filtro === "pasados" ? "filtro-activo" : "filtro-inactivo"}>
          Finalizados
        </Link>
      </div>

      {alquileresQuad.length === 0 ? (
        <p>No hay alquileres que coincidan.</p>
      ) : (
        <div className="listado">
          {alquileresQuad.map(alquiler => (
            <div key={alquiler.idAlquiler} className="item">
              <p><strong>Cliente: </strong>
                <Link href={`/clientes/${alquiler.idCliente}`}>{alquiler.nombre}</Link>
              </p>
              <p><strong>Inicio:</strong> {new Date(alquiler.fechaInicio).toLocaleDateString("es-ES", { timeZone: "UTC" })}</p>
              <p><strong>Fin:</strong>    {new Date(alquiler.fechaFin).toLocaleDateString("es-ES", { timeZone: "UTC" })}</p>
              <p><strong>Precio:</strong> {alquiler.precioFinal}€</p>
              <span className={`badge ${new Date(alquiler.fechaFin) >= ahora ? "badge-verde" : "badge-gris"}`}>
                {new Date(alquiler.fechaFin) >= ahora ? "Activo" : "Finalizado"}
              </span>
              <br />
              <Link href={`/alquileres/${alquiler.idAlquiler}`}>Ver alquiler</Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

