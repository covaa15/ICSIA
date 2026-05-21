import { crearCategoria } from "@/Funciones/funcionesMySQL";
import { redirect } from "next/navigation";
import Link from "next/link";

async function guardar(formData) {
  "use server";

  const nombre = formData.get("nombre");

  // Compruebo que el nombre no este vacio
  if (!nombre) {
    throw new Error("El nombre de la categoría es obligatorio");
  }

  await crearCategoria(nombre);
  redirect("/categorias");
}

export default function Page() {
  return (
    <main>
      <Link href="/categorias" className="volver">← Categorías</Link>
      <h1>Nueva Categoría</h1>

      <form action={guardar}>
        <label>Nombre de la categoría</label>
        <input
          type="text"
          name="nombre"
          required
          placeholder="Introduce el nombre de la categoría"
        />
        <button>Crear</button>
      </form>
    </main>
  );
}