import { crearQuad, obtenerCategorias,obtenerQuadPorMatricula } from "@/Funciones/funcionesMySQL.js";
import { redirect } from "next/navigation";
import Link from "next/link";

async function guardar(formData) {
  "use server";

  //Obtengo los datos del formulatio
  const marca = formData.get("marca");
  const modelo = formData.get("modelo");
  const matricula = formData.get("matricula");
  const precioDia = Number(formData.get("precio"));
  const imagen = formData.get("imagen");
  const idCategoria = formData.get("categoria");

// Compruebo que todos los campos esten cubiertos
if (!marca || !modelo || !matricula || !precioDia || !imagen || !idCategoria || idCategoria === "") {
  redirect("/quads/nuevoQuad?error=campos");
}

// Compruebo si ya existe un quad con esa matricula
const existe = await obtenerQuadPorMatricula(matricula);
if (existe) {
  redirect("/quads/nuevoQuad?error=matricula");
}

const idQuad = await crearQuad({ marca, modelo, matricula, precioDia, imagen, idCategoria: Number(idCategoria) });
redirect(`/quads/${idQuad}`);
}

const mensajes = {
campos:    "Todos los campos son obligatorios.",
matricula: "Ya existe un quad registrado con esa matrícula.",
};

export default async function Page({ searchParams }) {
const categorias = await obtenerCategorias();
const params = await searchParams;
const error  = params?.error || null;

return (
  <main>
    <Link href="/quads" className="volver">← Volver a Quads</Link>
    <h1>Nuevo Quad</h1>

    {/* Alerta que salta cuanso se produce un error */}
    {error && (
      <div className="alerta-error">
        <span>{mensajes[error] || "Ha ocurrido un error."}</span>
        <Link href="/quads/nuevoQuad" className="alerta-cerrar">✕</Link>
      </div>
    )}

    {/* Muestro un aviso si no hay categorias */}
    {categorias.length === 0 && (
      <p style={{ color: "#dc2626", textAlign: "center" }}>
        Primero debes crear al menos una categoría en{" "}
        <Link href="/categorias">Categorías</Link>
      </p>
    )}

    <form action={guardar}>
      <label>Marca</label>
      <input type="text" name="marca" required placeholder="Introduce la Marca" />
      <label>Modelo</label>
      <input type="text" name="modelo" required placeholder="Introduce el Modelo" />
      <label>Matrícula</label>
      <input type="text" name="matricula" required placeholder="Introduce la Matrícula" />
      <label>Precio/día</label>
      <input type="number" name="precio" required min="0" placeholder="Precio por día" />
      <label>URL de la Imagen</label>
      <input type="url" name="imagen" required placeholder="Introduce la URL de la imagen" />
      <label>Categoría</label>
      <select name="categoria" defaultValue="" required>
        <option disabled value="">Selecciona una categoría</option>
        {categorias.map(categoria => (
          <option key={categoria.idCategoria} value={categoria.idCategoria}>
            {categoria.nombre}
          </option>
        ))}
      </select>
      <button>Crear</button>
    </form>
  </main>
);
}