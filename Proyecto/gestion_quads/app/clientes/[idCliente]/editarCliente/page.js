import { obtenerCliente, actualizarCliente, obtenerClientePorEmail } from "@/Funciones/funcionesMySQL";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

async function editarCliente(id, formData) {
  "use server";

  const nombre = formData.get("nombre");
  const email = formData.get("email");
  const telefono = formData.get("telefono");

  // Compruebo que todos los campos esten cubiertos
  if (!nombre || !email || !telefono) {
    throw new Error("Todos los campos son obligatorios");
  }

  // Validacion basica del email
  if (!validarEmail(email)) {
    throw new Error("El email no es valido");
  }

  // Compruebo si ya existe otro cliente con ese email distinto al actual
  const existe = await obtenerClientePorEmail(email);
  if (existe && existe.idCliente !== Number(id)) {
    redirect(`/clientes/${id}/editarCliente?error=duplicado`);
  }

  await actualizarCliente(id, { nombre, email, telefono });
  redirect(`/clientes/${id}`);
}

const mensajes = {
  campos: "Todos los campos son obligatorios.",
  email: "El email no tiene un formato válido.",
  duplicado: "Ya existe un cliente registrado con ese email.",
};

export default async function Page({ params, searchParams }) {
  const { idCliente } = await params;
  const cliente = await obtenerCliente(idCliente);

  if (!cliente) notFound();

  const p = await searchParams;
  const error = p?.error || null;

  return (
    <main>
      <Link href={`/clientes/${cliente.idCliente}`} className="volver">← Volver a la Ficha</Link>
      <h1>Editar Cliente</h1>

      {/* Mensaje de error con boton de cerrar */}
      {error && (
        <div className="alerta-error">
          <span>{mensajes[error] || "Ha ocurrido un error."}</span>
          <Link href={`/clientes/${cliente.idCliente}/editarCliente`} className="alerta-cerrar">✕</Link>
        </div>
      )}

      <form action={editarCliente.bind(null, cliente.idCliente)}>
        <label>Nombre</label>
        <input name="nombre" required defaultValue={cliente.nombre} />
        <label>Email</label>
        <input name="email" type="email" required defaultValue={cliente.email} />
        <label>Teléfono</label>
        <input name="telefono" type="tel" required defaultValue={cliente.telefono} />
        <button>Guardar Cambios</button>
      </form>
    </main>
  );
}

function validarEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}