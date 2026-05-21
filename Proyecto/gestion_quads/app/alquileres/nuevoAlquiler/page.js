import { crearAlquiler, obtenerClientes, obtenerQuads, obtenerPrecioDia, obtenerAlquileresQuadFechas } from "@/Funciones/funcionesMySQL";
import Link from "next/link";
import { redirect } from "next/navigation";

async function guardar(formData) {
  "use server";

  const idQuad = parseInt(formData.get("quad"))|| 0;
  const idCliente = parseInt(formData.get("cliente")) || 0;
  const fechaInicioFormulario = formData.get("inicio");
  const fechaFinFormulario = formData.get("fin");

  // Compruebo que todos los campos esten rellenos
  if (!idQuad || !idCliente || !fechaInicioFormulario || !fechaFinFormulario) {
    redirect("/alquileres/nuevoAlquiler?error=campos");
  }

  const fechaInicio = new Date(fechaInicioFormulario);
  const fechaFin    = new Date(fechaFinFormulario);

  // Compruebo que la fecha de inicio no sea anterior a hoy
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  if (fechaInicio < hoy) {
    redirect("/alquileres/nuevoAlquiler?error=inicio");
  }

  // Compruebo que la fecha de fin sea posterior a la de inicio
  if (fechaFin < fechaInicio) {
    redirect("/alquileres/nuevoAlquiler?error=fin");
  }

  // Compruebo si el quad ya tiene un alquiler que se solape con esas fechas
  const solapado = await obtenerAlquileresQuadFechas(idQuad, fechaInicioFormulario, fechaFinFormulario);
  if (solapado > 0) {
    redirect("/alquileres/nuevoAlquiler?error=solapado");
  }

  // Obtengo el precio por dia del quad para calcular el total
  const precio = await obtenerPrecioDia(idQuad);
  const precioDia = precio?.precioDia || 0;

  // Calculo los dias de diferencia y como minimo cobro 1 dia
  const diferenciaMilisegundos = Math.abs(fechaFin - fechaInicio);
  const dias = Math.max(1, Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24)));
  const precioFinal = precioDia * dias;

  const idAlquiler = await crearAlquiler({
    idQuad,
    idCliente,
    fechaInicio: fechaInicioFormulario,
    fechaFin:    fechaFinFormulario,
    precioFinal
  });
  redirect(`/alquileres/${idAlquiler}`);
}

const mensajes = {
  campos:   "Todos los campos son obligatorios.",
  inicio:   "La fecha de inicio no puede ser anterior a hoy.",
  fin:      "La fecha de fin debe ser posterior a la de inicio.",
  solapado: "Este quad ya está alquilado en ese periodo de fechas.",
};

export default async function Page({ searchParams }) {
  const quads    = await obtenerQuads();
  const clientes = await obtenerClientes();

  const params = await searchParams;
  const error  = params?.error || null;

  const hoy = new Date().toISOString().split("T")[0];

  return (
    <main>
      <Link href="/alquileres" className="volver">← Volver a Alquileres</Link>
      <h1>Nuevo Alquiler</h1>

      {error && (
        <div className="alerta-error">
          <span>{mensajes[error] || "Ha ocurrido un error."}</span>
          <Link href="/alquileres/nuevoAlquiler" className="alerta-cerrar">✕</Link>
        </div>
      )}

      {quads.length === 0 && (
        <p style={{ color: "#dc2626", textAlign: "center" }}>
          No hay quads registrados.
        </p>
      )}

      <form action={guardar}>
        <label>Quad</label>
        <select name="quad" defaultValue="" required>
          <option disabled value="">Selecciona un Quad</option>
          {quads.map(quad => (
            <option key={quad.idQuad} value={quad.idQuad}>
              {quad.marca} {quad.modelo} — {quad.precioDia}€/día
            </option>
          ))}
        </select>

        <label>Cliente</label>
        <select name="cliente" defaultValue="" required>
          <option disabled value="">Selecciona un Cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.idCliente} value={cliente.idCliente}>
              {cliente.nombre}
            </option>
          ))}
        </select>

        <label>Fecha de Inicio</label>
        <input type="date" name="inicio" required min={hoy} />

        <label>Fecha de Fin</label>
        <input type="date" name="fin" required min={hoy} />

        <button>Crear Alquiler</button>
      </form>
    </main>
  );
}