import Link from "next/link";
import { obtenerCliente, eliminarCliente, obtenerAlquileres } from "@/Funciones/funcionesMySQL";
import { redirect, notFound } from "next/navigation";
import BotonBorrar from "../../componentes/BotonBorrar.js";
async function borrar(id) {
  "use server";

  // Compruebo si el cliente tiene algún alquiler activo
  const todos = await obtenerAlquileres();
  const ahora = new Date();
  const activo = todos.some(
    alquiler => alquiler.idCliente === Number(id) && new Date(alquiler.fechaFin) >= ahora
  );

  if (activo) {
    redirect(`/clientes/${id}?error=activo`);
  }

  await eliminarCliente(id);
  redirect("/clientes");
}

const mensajes = {
  activo: "No puedes eliminar este cliente porque tiene alquileres activos.",
};

export default async function Page({ params, searchParams }) {
  const { idCliente } = await params;
  const cliente = await obtenerCliente(idCliente);

  if (!cliente)
    notFound();

  // Recojo el error de la URL si lo hay
  const p = await searchParams;
  const error = p?.error || null;

  // Cargo todos los alquileres y me quedo solo con los de este cliente
  const todosAlquileres = await obtenerAlquileres();
  const alquileresCliente = todosAlquileres.filter(alquiler => alquiler.idCliente === cliente.idCliente);

  return (
    <main>
      <Link href="/clientes" className="volver">← Volver a Clientes</Link>
      <h1>{cliente.nombre}</h1>

      {/* Alerta si se intentan borrar un cliente con alquileres activos */}
      {error && (
        <div className="alerta-error">
          <span>{mensajes[error] || "Ha ocurrido un error."}</span>
          <Link href={`/clientes/${cliente.idCliente}`} className="alerta-cerrar">✕</Link>
        </div>
      )}

      <div className="detalle">
        <p><strong>Email:</strong> {cliente.email}</p>
        <p><strong>Teléfono:</strong> {cliente.telefono}</p>
        <Link href={`/clientes/${cliente.idCliente}/editarCliente`} className="btn-detalle">Editar</Link>
        <br /><br />
        <form action={borrar.bind(null, cliente.idCliente)}
          style={{ margin: 0, padding: 0, boxShadow: "none", background: "none" }}>

          <BotonBorrar mensaje="¿Seguro que quieres eliminar este Cliente?" className="eliminar">
            Eliminar Cliente
          </BotonBorrar>
        </form>
      </div>

      <h2 style={{ marginTop: "40px" }}>Alquileres de {cliente.nombre}</h2>
      {alquileresCliente.length === 0 ? (
        <p>Este cliente no tiene alquileres registrados.</p>
      ) : (
        <div className="listado">
          {alquileresCliente.map(alquiler => (
            <div key={alquiler.idAlquiler} className="item">
              <p><strong>Quad: </strong><Link href={`/quads/${alquiler.idQuad}`}>{alquiler.marca}</Link></p>
              <p><strong>Inicio:</strong> {new Date(alquiler.fechaInicio).toLocaleDateString("es-ES", { timeZone: "UTC" })}</p>
              <p><strong>Fin:</strong>    {new Date(alquiler.fechaFin).toLocaleDateString("es-ES", { timeZone: "UTC" })}</p>
              <p><strong>Precio:</strong> {alquiler.precioFinal}€</p>
              <Link href={`/alquileres/${alquiler.idAlquiler}`}>Ver alquiler</Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}