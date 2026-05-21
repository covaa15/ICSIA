import Link from "next/link";
import { obtenerRutas } from "@/Funciones/funcionesMongoDB";

export default async function Page({ searchParams }) {
  const rutas = await obtenerRutas();

  const params = await searchParams;

  const filtroDificultad = params?.dificultad || "";
  const filtroKms        = params?.kms        || "";

  const rutasFiltradas = rutas.filter((ruta) => {
    const coincideDificultad = !filtroDificultad || ruta.dificultad === filtroDificultad;
    const coincideKms = !filtroKms ||
      (filtroKms === "corta" && ruta.kms <= 20) ||
      (filtroKms === "media" && ruta.kms > 20 && ruta.kms <= 50) ||
      (filtroKms === "larga" && ruta.kms > 50);
    return coincideDificultad && coincideKms;
  });

  return (
    <main>
      <Link href="/" className="volver">← Volver a Inicio</Link>
      <h1>Rutas</h1>
      <Link href="/rutas/nuevaRuta" className="nuevo">+ Nueva Ruta</Link>

      <form method="GET" className="filtros-inline">
        <select name="dificultad" defaultValue={params?.dificultad || ""} className="filtro-select">
          <option value="">Todas las dificultades</option>
          <option value="Sencilla">Sencilla</option>
          <option value="Media">Media</option>
          <option value="Dificil">Difícil</option>
        </select>
        <select name="kms" defaultValue={params?.kms || ""} className="filtro-select">
          <option value="">Todos los tramos</option>
          <option value="corta">Hasta 20 km</option>
          <option value="media">21–50 km</option>
          <option value="larga">Más de 50 km</option>
        </select>
        <button type="submit" className="filtro-btn">Filtrar</button>
        <Link href="/rutas" className="filtro-limpiar">Limpiar</Link>
      </form>

      {rutasFiltradas.length === 0 && (
        <p className="vacio">No hay rutas que coincidan</p>
      )}

      <div className="tarjetas-grid">
        {rutasFiltradas.map(ruta => (
          <div key={ruta._id} className="tarjeta">

            {ruta.imagen ? (
              <img
                src={ruta.imagen}
                alt={ruta.nombre}
                className="tarjeta-imagen"
              />
            ) : (
              <div className="tarjeta-sin-imagen">Sin imagen</div>
            )}

            <div className="tarjeta-body">
              <h3 className="tarjeta-titulo">{ruta.nombre}</h3>
              <p className="tarjeta-info"><strong>Distancia:</strong> {ruta.kms} km</p>
              <p className="tarjeta-info"><strong>Dificultad:</strong> {ruta.dificultad}</p>

              <span className={`badge ${
                ruta.dificultad === "Sencilla" ? "badge-verde" :
                ruta.dificultad === "Media"    ? "badge-amarillo" :
                "badge-rojo"
              }`}>
                {ruta.dificultad}
              </span>

              <Link href={`/rutas/${ruta._id}`} className="tarjeta-btn">
                Ver ruta
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}