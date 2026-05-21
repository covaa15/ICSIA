import { insertarRuta } from "@/Funciones/funcionesMongoDB.js";
import { redirect } from "next/navigation";
import Link from "next/link";

async function crear(formData) {
  "use server";

  const nombre = formData.get("nombre");
  const kms = Number(formData.get("kms"));
  const dificultad = formData.get("dificultad");
  const imagen = formData.get("imagen");

  // Compruebo que todos los campos esten cubiertos
  if (!nombre || !kms || !dificultad || dificultad === "" || !imagen) {
    throw new Error("Todos los campos son obligatorios");
  }

  if (kms <= 0) {
    throw new Error("Los kilómetros deben ser un número positivo");
  }

  await insertarRuta({ nombre, kms, dificultad, imagen });
  redirect("/rutas");
}

export default function Page() {
  return (
    <main>
      <Link href="/rutas" className="volver">← Volver a Rutas</Link>
      <h1>Nueva Ruta</h1>
      <form action={crear}>
        <label>Nombre de la Ruta</label>
        <input name="nombre" required placeholder="Nombre de la ruta" />
        <label>Kilómetros</label>
        <input name="kms" type="number" required min="1" placeholder="Kilómetros de la ruta" />
        <label>Dificultad</label>
        <select name="dificultad" defaultValue="" required>
          <option disabled value="">Selecciona la dificultad</option>
          <option>Sencilla</option>
          <option>Media</option>
          <option>Dificil</option>
        </select>
        <label>URL de la Imagen</label>
        <input name="imagen" type="url" required placeholder="Introduce la URL de la imagen" />
        <button>Crear</button>
      </form>
    </main>
  );
}