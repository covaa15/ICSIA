import Link from "next/link";
import { obtenerQuads, obtenerCategorias } from "@/Funciones/funcionesMySQL";

export default async function Page({ searchParams }) {
  const quads = await obtenerQuads();
  const categorias = await obtenerCategorias();

  const params = await searchParams;

  
  const filtroBusqueda = params?.busqueda?.toLowerCase() || "";
  const filtroEstado = params?.estado    || "";
  const filtroCategoria = params?.categoria || "";

  // Filtro los quads 
  const quadsFiltrados = quads.filter((quad) => {
    const coincideBusqueda =
      !filtroBusqueda ||
      quad.marca?.toLowerCase().includes(filtroBusqueda) ||
      quad.modelo?.toLowerCase().includes(filtroBusqueda) ||
      quad.matricula?.toLowerCase().includes(filtroBusqueda);

    const coincideEstado = !filtroEstado || quad.estado === filtroEstado;
    const coincideCategoria = !filtroCategoria || String(quad.idCategoria) === filtroCategoria;

    return coincideBusqueda && coincideEstado && coincideCategoria;
  });

  return (
    <main>
      <Link href="/" className="volver">← Volver a Inicio</Link>
      <h1>Nuestros Quads</h1>
      <Link href="/quads/nuevoQuad" className="nuevo">+ Nuevo Quad</Link>

    
      <form method="GET" className="filtros-inline">
        <input
          name="busqueda"
          placeholder="Buscar por marca, modelo o matrícula..."
          defaultValue={params?.busqueda || ""}
          className="filtro-input"
        />
        <select name="estado" defaultValue={params?.estado || ""} className="filtro-select">
          <option value="">Todos los estados</option>
          <option value="Disponible">Disponible</option>
          <option value="Alquilado">Alquilado</option>
        </select>
        <select name="categoria" defaultValue={params?.categoria || ""} className="filtro-select">
          <option value="">Todas las categorías</option>
          {categorias.map(categoria => (
            <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.nombre}</option>
          ))}
        </select>
        <button type="submit" className="filtro-btn">Filtrar</button>
        <Link href="/quads" className="filtro-limpiar">Limpiar</Link>
      </form>

      {quadsFiltrados.length === 0 && (
        <p className="vacio">No hay quads que coincidan</p>
      )}

      
      <div className="tarjetas-grid">
        {quadsFiltrados.map(quad => (
          <div key={quad.idQuad} className="tarjeta">

          
            {quad.imagen ? (
              <img
                src={quad.imagen}
                alt={`${quad.marca} ${quad.modelo}`}
                className="tarjeta-imagen"
              />
            ) : (
              <div className="tarjeta-sin-imagen">Sin imagen</div>
            )}

         
            <div className="tarjeta-body">
              <h3 className="tarjeta-titulo">{quad.marca} {quad.modelo}</h3>
              <p className="tarjeta-info">Matrícula: {quad.matricula}</p>
              <p className="tarjeta-info">Precio: {quad.precioDia}€/día</p>

              
              <span className={`badge ${quad.estado === "Disponible" ? "badge-verde" : "badge-amarillo"}`}>
                {quad.estado}
              </span>

              <Link href={`/quads/${quad.idQuad}`} className="tarjeta-btn">
                Ver detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}