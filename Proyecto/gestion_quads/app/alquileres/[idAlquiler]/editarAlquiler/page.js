import { obtenerAlquiler, actualizarAlquiler, obtenerQuads, obtenerClientes, obtenerAlquileresQuadFechas ,obtenerPrecioDia} from "@/Funciones/funcionesMySQL";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

async function editarAlquiler(id, idQuadActual, formData) {
  "use server";

  const idQuad = formData.get("idQuad");
  const idCliente = formData.get("idCliente");
  const fechaInicioFormulario = formData.get("fechaInicio");
  const fechaFinFormulario = formData.get("fechaFin");

  // Compruebo que todos los campos esten cubiertos
  if (!idQuad || !idCliente || !fechaInicioFormulario || !fechaFinFormulario) {
    redirect(`/alquileres/${id}/editarAlquiler?error=campos`);
  }

  const fechaInicio = new Date(fechaInicioFormulario);
  const fechaFin = new Date(fechaFinFormulario);

  // Compruebo que la fecha de inicio no sea anterior a hoy
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  if (fechaInicio < hoy) {
    redirect(`/alquileres/${id}/editarAlquiler?error=inicio`);
  }

  // Compruebo que la fecha de fin sea posterior a la de inicio
  if (fechaFin <= fechaInicio) {
    redirect(`/alquileres/${id}/editarAlquiler?error=fin`);
  }


  // Compruebo solapamiento excluyendo el alquiler actual que estoy editando
  const solapado = await obtenerAlquileresQuadFechas(Number(idQuad), fechaInicioFormulario, fechaFinFormulario);

  const solapadoReal = Number(idQuad) === Number(idQuadActual) ? solapado - 1 : solapado;
  if (solapadoReal > 0) {
    redirect(`/alquileres/${id}/editarAlquiler?error=solapado`);
  }

   // Vuelvo a calcular el precio del alquiler del quad con el nuevo rango de fechas
   const precioDiaQuad = await obtenerPrecioDia(Number(idQuad));
   const precioDia= precioDiaQuad?.precioDia || 0;
   const diferenciaMilisegundos = Math.abs(fechaFin - fechaInicio);
   const dias = Math.max(1, Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24)));
   const precioFinal = precioDia * dias;
   
  await actualizarAlquiler(id, {
    idQuad:Number(idQuad),
    idCliente:Number(idCliente),
    fechaInicio: fechaInicioFormulario,
    fechaFin:fechaFinFormulario,
    precioFinal,
  });

  redirect(`/alquileres/${id}`);
}

const mensajes = {
  campos:   "Todos los campos son obligatorios.",
  inicio:"La fecha de inicio no puede ser anterior a hoy.",
  fin:"La fecha de fin debe ser posterior a la de inicio.",
  precio: "El precio no puede ser negativo.",
  solapado: "Este quad ya está alquilado en ese periodo de fechas.",
};

export default async function Page({ params, searchParams }) {

  const { idAlquiler } = await params;
  const alquiler = await obtenerAlquiler(idAlquiler);

  if (!alquiler) 
      notFound();

  const sp = await searchParams;
  const error = sp?.error || null;

  const quads = await obtenerQuads();
  const clientes = await obtenerClientes();

// Formateo la fecha usando UTC para evitar que cambie el dia por la zona horaria
// Cojo solo la parte de la fecha del string sin pasar por Date
const formateoFechas = (f) => {
  if (!f) return "";
  return String(f).split("T")[0];
};

  return (
    <main>
      <Link href={`/alquileres/${alquiler.idAlquiler}`} className="volver">← Volver</Link>
      <h1>Editar Alquiler #{alquiler.idAlquiler}</h1>

      {error && (
        <div className="alerta-error">
          <span>{mensajes[error] || "Ha ocurrido un error."}</span>
          <Link href={`/alquileres/${alquiler.idAlquiler}/editarAlquiler`} className="alerta-cerrar">✕</Link>
        </div>
      )}

      <form action={editarAlquiler.bind(null, alquiler.idAlquiler, alquiler.idQuad)}>
        <label>Quad</label>
        <select name="idQuad" required defaultValue={alquiler.idQuad}>
          {quads.map(q => (
            <option key={q.idQuad} value={q.idQuad}>{q.marca} {q.modelo}</option>
          ))}
        </select>

        <label>Cliente</label>
        <select name="idCliente" required defaultValue={alquiler.idCliente}>
          {clientes.map(c => (
            <option key={c.idCliente} value={c.idCliente}>{c.nombre}</option>
          ))}
        </select>

        <label>Fecha de Inicio</label>
        <input name="fechaInicio" type="date" required defaultValue={formateoFechas(alquiler.fechaInicio)} />

        <label>Fecha de Fin</label>
        <input name="fechaFin" type="date" required defaultValue={formateoFechas(alquiler.fechaFin)} />

        <button>Guardar Cambios</button>
      </form>
    </main>
  );
}