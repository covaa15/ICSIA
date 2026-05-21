import { obtenerRutaID, actualizarRuta } from "@/Funciones/funcionesMongoDB.js";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

async function editar(id, formData) {
  "use server";

  const nombre = formData.get("nombre");
  const kms = Number(formData.get("kms"));
  const dificultad = formData.get("dificultad");
  const imagen = formData.get("imagen");

  if (!nombre || !kms || !dificultad || !imagen) {
    throw new Error("Todos los campos son obligatorios");
  }

  if (kms <= 0) {
    throw new Error("Los kilómetros deben ser un número positivo");
  }

  await actualizarRuta(id, { nombre, kms, dificultad, imagen });
  redirect("/rutas");
}

export default async function Page({ params }) {
  const {idRuta} = await params;
  const ruta = await obtenerRutaID(idRuta);

  if (!ruta) notFound();

  return (
    <main>
      <Link href={`/rutas/${ruta._id}`} className="volver">← Volver</Link>
      <h1>Editar Ruta</h1>

      <form action={editar.bind(null, String(ruta._id))}>

        <label>Nombre de la Ruta</label>
        <input name="nombre" required defaultValue={ruta.nombre} />
        <label>Kilómetros</label>
        <input name="kms" type="number" min="1" required defaultValue={ruta.kms} />
        <label>Dificultad</label>
        <select name="dificultad" required defaultValue={ruta.dificultad}>
          <option value="Sencilla">Sencilla</option>
          <option value="Media">Media</option>
          <option value="Dificil">Difícil</option>
        </select>
        <label>URL de la Imagen</label>
        <input name="imagen" type="url" required defaultValue={ruta.imagen} />
        <button>Guardar Cambios</button>
      </form>
    </main>
  );
}