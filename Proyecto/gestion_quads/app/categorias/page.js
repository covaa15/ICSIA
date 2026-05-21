import Link from "next/link";
import { obtenerCategorias, eliminarCategoria, obtenerQuadsCategoria } from "@/Funciones/funcionesMySQL";
import { redirect } from "next/navigation";
import BotonBorrar from "../componentes/BotonBorrar.js";


async function borrar(id) {
  "use server";

  // Compruebo cuantos quads tienen esta categoria
  const total = await obtenerQuadsCategoria(id);

  if (total > 0) {
    redirect("/categorias?error=quads");
  }

  await eliminarCategoria(id);
  redirect("/categorias");
}

const mensajes = {
  quads: "No puedes eliminar esta categoría porque tiene quads asignados.",
};

export default async function Page({ searchParams }) {
  const categorias = await obtenerCategorias();

  const params = await searchParams;
  const error = params?.error || null;

  return (
    <main>
      <Link href="/" className="volver">← Volver a Inicio</Link>
      <h1>Categorías</h1>
      <Link href="/categorias/nuevaCategoria" className="nuevo">+ Nueva Categoría</Link>

      {error && (
        <div className="alerta-error">
          <span>{mensajes[error] || "Ha ocurrido un error."}</span>
          <Link href="/categorias" className="alerta-cerrar">✕</Link>
        </div>
      )}

      {categorias.length === 0 ? (
        <p style={{ textAlign: "center", color: "#64748b", marginTop: "40px" }}>
          No hay categorías
        </p>
      ) : (
        <div className="listado">
          {categorias.map(categoria => (
            <div key={categoria.idCategoria} className="item" style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <strong>{categoria.nombre}</strong>

              <div className="categoria-acciones">
                <Link href={`/categorias/${categoria.idCategoria}/editarCategoria`} className="categoria-btn-editar">
                  Editar
                </Link>
                <form action={borrar.bind(null, categoria.idCategoria)}
                  style={{ margin: 0, padding: 0, boxShadow: "none", background: "none" }}>
                  <BotonBorrar mensaje="¿Seguro que quieres eliminar esta Categoria?" className="eliminar">
                    Eliminar
                  </BotonBorrar>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}