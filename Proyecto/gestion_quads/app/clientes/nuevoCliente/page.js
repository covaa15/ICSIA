import { crearCliente,obtenerClientePorEmail  } from "@/Funciones/funcionesMySQL.js";
import { redirect } from "next/navigation";
import Link from "next/link";
 
async function guardar(formData) {
  "use server";
 
  const nombre = formData.get("nombre");
  const email = formData.get("email");
  const telefono = formData.get("telefono");
 
  // Compruebo que todos los campos esten rellenos
  if (!nombre || !email || !telefono) {
    throw new Error("Todos los campos son obligatorios");
  }
 
  // Validacion basica del email
  if (!validarEmail(email)) {
    throw new Error("El email no es valido");
  }
 
// Compruebo si ya existe un cliente con ese email
const existe = await obtenerClientePorEmail(email);
if (existe) {
  redirect("/clientes/nuevoCliente?error=duplicado");
}

await crearCliente({ nombre, email, telefono });
redirect("/clientes");
}

const mensajes = {
  campos:    "Todos los campos son obligatorios.",
  email:     "El email no tiene un formato válido.",
  duplicado: "Ya existe un cliente registrado con ese email.",
};

 
export default async function Page({ searchParams }) {
  const params = await searchParams;
  const error  = params?.error || null;

  return (
    <main>
      <Link href="/clientes" className="volver">← Volver a Clientes</Link>
      <h1>Nuevo Cliente</h1>

      {error && (
        <div className="alerta-error">
          <span>{mensajes[error] || "Ha ocurrido un error."}</span>
          <Link href="/clientes/nuevoCliente" className="alerta-cerrar">✕</Link>
        </div>
       
      )}

      <form action={guardar}>
        <label>Nombre</label>
        <input type="text" name="nombre" required placeholder="Nombre del cliente" />
        <label>Email</label>
        <input type="email" name="email" required placeholder="Email del cliente" />
        <label>Teléfono</label>
        <input type="tel" name="telefono" required placeholder="Teléfono del cliente" />
        <button>Crear</button>
      </form>
    </main>
  );
}

function validarEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}