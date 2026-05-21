import { obtenerCategoria, actualizarCategoria } from "@/Funciones/funcionesMySQL";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

async function guardar(id, formData) {
  "use server";

  const nombre = formData.get("nombre");

  // Compruebo que el nombre no este vacio
  if (!nombre) {
    throw new Error("El nombre de la categoría es obligatorio");
  }

  await actualizarCategoria(id, nombre);
  redirect("/categorias");
}

export default async function Page({ params }) {
  // Busco la categoria 
    const { idCategoria } = await params;
  const categoria = await obtenerCategoria(idCategoria);

  if (!categoria) notFound();

  return (
    <main>
      <Link href="/categorias" className="volver">← Categorías</Link>
      <h1>Editar Categoría</h1>

      {/* Cargo el nombre actual de la categoria */}
      <form action={guardar.bind(null, categoria.idCategoria)}>
        <label>Nombre de la categoría</label>
        <input type="text" name="nombre" required defaultValue={categoria.nombre} placeholder="Introduce el nombre de la categoría"/>
        <button>Guardar Cambios</button>
      </form>
    </main>
  );
}