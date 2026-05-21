import Link from "next/link";
import { obtenerRutaID, eliminarRuta } from "@/Funciones/funcionesMongoDB.js";
import { redirect, notFound } from "next/navigation";
import BotonBorrar from "../../componentes/BotonBorrar.js";

async function borrar(id) {
  "use server";
  await eliminarRuta(id);
  redirect("/rutas");
}

export default async function Page({ params }) {
  const { idRuta } = await params;
  const ruta = await obtenerRutaID(idRuta);

  if (!ruta) notFound();

  return (
    <main>
      <Link href="/rutas" className="volver">← Volver a Rutas</Link>
      <h1>{ruta.nombre}</h1>

      <div className="detalle">
        {ruta.imagen ? (
          <img
            src={ruta.imagen}
            alt={`Imagen de la Ruta`}
            className="tarjeta-imagen"
          />
        ) : (
          <div className="tarjeta-sin-imagen">Sin imagen</div>
        )}
        <div className="detalle">
          <p><strong>Distancia:</strong>  {ruta.kms} km</p>
          <p><strong>Dificultad:</strong> {ruta.dificultad}</p>
          <Link href={`/rutas/${ruta._id}/editarRuta`} className="btn-detalle">Editar</Link>
          <br /><br />

          <form action={borrar.bind(null, String(ruta._id))}
            style={{ margin: 0, padding: 0, boxShadow: "none", background: "none" }}>

            <BotonBorrar mensaje="¿Seguro que quieres eliminar este quad?" className="eliminar">
              Eliminar Ruta
            </BotonBorrar>
          </form>
        </div>
      </div>

    </main>
  );
}




