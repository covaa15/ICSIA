import { obtenerQuad, actualizarQuad, obtenerCategorias } from "@/Funciones/funcionesMySQL.js";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
 
async function editarQuad(idQuad, formData) {
  "use server";
 
  //Obtengo los datos del formulario
  const marca = formData.get("marca");
  const modelo = formData.get("modelo");
  const matricula = formData.get("matricula");
  const precioDia = Number(formData.get("precioDia"));
  const imagen = formData.get("imagen");
  const idCategoria = formData.get("idCategoria");
 
  // Compruebo que todos los campos estan cubiertos
  if (!marca || !modelo || !matricula || !precioDia || !imagen || !idCategoria || idCategoria === "defecto") {
    throw new Error("Todos los campos son obligatorios");
  }
 
  await actualizarQuad(idQuad, { marca, modelo, matricula, precioDia, imagen, idCategoria: Number(idCategoria) });
  redirect(`/quads/${idQuad}`);
}
 
export default async function Page({ params }) {
  
  //Obtengo todas las categorias y un quad en concreto
  const { idQuad } = await params;
  const quad = await obtenerQuad(idQuad);
  const categorias = await obtenerCategorias();

 // Compruebo si existe el quad y sino muesto el mensaje de notFound
  if (!quad) 
    notFound();
 
  return (
    <main>
      <Link href={`/quads/${idQuad}`} className="volver">← Volver a Quads</Link>
      <h1>Editar Quad</h1>
 
      {/* Cargo los valores actuales del quad en el formulario */}
      <form action={editarQuad.bind(null, quad.idQuad)}>
        <label>Marca</label>
        <input name="marca" required defaultValue={quad.marca} />
        <label>Modelo</label>
        <input name="modelo" required defaultValue={quad.modelo} />
        <label>Matrícula</label>
        <input name="matricula" required defaultValue={quad.matricula} readOnly />
        <label>Precio/día</label>
        <input name="precioDia" type="number" min="0" required defaultValue={quad.precioDia} />
        <label>URL Imagen</label>
        <input name="imagen" type="url" required defaultValue={quad.imagen} />
        <label>Categoría</label>
        <select name="idCategoria" required defaultValue={quad.idCategoria}>
          <option disabled value="defecto">Selecciona una categoría</option>
          {categorias.map(categoria => (
            <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.nombre}</option>
          ))}
        </select>
        <button>Guardar Cambios</button>
      </form>
    </main>
  );
}