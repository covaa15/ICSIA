import Link from "next/link";
import { obtenerAlquiler, eliminarAlquiler, desalquilarQuad, obtenerQuad, obtenerCliente } from "@/Funciones/funcionesMySQL.js";
import { redirect, notFound } from "next/navigation";
import BotonBorrar from "../../componentes/BotonBorrar.js";

async function borrar(id, idQuad) {
  "use server";
  // Elimino el alquiler y devuelvo el quad a Disponible
  await eliminarAlquiler(id, idQuad);
  redirect("/alquileres");
}

async function devolver(idQuad) {
  "use server";
  await desalquilarQuad(idQuad);
  redirect("/quads");
}

export default async function Page({ params }) {
  const { idAlquiler } = await params;
  const alquiler = await obtenerAlquiler(idAlquiler);

  if (!alquiler)
    notFound();

  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const fin = new Date(alquiler.fechaFin); fin.setHours(0, 0, 0, 0);
  const activo = fin >= hoy;
  const quad = await obtenerQuad(alquiler.idQuad);
  const cliente = await obtenerCliente(alquiler.idCliente);

  return (
    <main>
      <Link href="/alquileres" className="volver">← Volver a Alquileres</Link>
      <h1>Alquiler #{alquiler.idAlquiler}</h1>

      <div className="detalle">
        {/*Cuando hago clic en el nombre del quad voy directo al quad */}
        <p><strong>Quad: </strong><Link href={`/quads/${quad.idQuad}`}>{quad.marca}</Link></p>
        {/* Cuando hago clic en el nombre del cliente voy directo al cliente*/}
        <p><strong>Cliente: </strong><Link href={`/clientes/${cliente.idCliente}`}>{cliente.nombre}</Link></p>
        <p><strong>Inicio:</strong> {new Date(alquiler.fechaInicio).toLocaleDateString("es-ES", { timeZone: "UTC" })}</p>
        <p><strong>Fin:</strong>    {new Date(alquiler.fechaFin).toLocaleDateString("es-ES", { timeZone: "UTC" })}</p>
        <p><strong>Precio Final:</strong> {alquiler.precioFinal}€</p>
        <p><strong>Estado: </strong>
          <span className={`badge ${activo ? "badge-verde" : "badge-gris"}`}>
            {activo ? "Activo" : "Finalizado"}
          </span>
        </p>

        <Link href={`/alquileres/${alquiler.idAlquiler}/editarAlquiler`} className="btn-detalle"> Editar Alquiler</Link>
        <br /><br />

        <form action={devolver.bind(null, alquiler.idQuad)}
          style={{ margin: 0, padding: 0, boxShadow: "none", background: "orange" }}>
          <button className="eliminar">Devolver Quad</button>
        </form>
        <br /><br />
        <form action={borrar.bind(null, alquiler.idAlquiler, alquiler.idQuad)}
          style={{ margin: 0, padding: 0, boxShadow: "none", background: "none" }}>
          <BotonBorrar mensaje="¿Seguro que quieres eliminar este Alquiler?" className="eliminar">
                  Eliminar Alquiler
                </BotonBorrar>
        </form>

      </div>
    </main>
  );
}