import Link from "next/link";
import { obtenerQuads, obtenerClientes, obtenerAlquileres, obtenerCategorias } from "@/Funciones/funcionesMySQL";
import { obtenerRutas } from "@/Funciones/funcionesMongoDB";
 
export default async function Page() {
 
  const [quads, clientes, alquileres, rutas,categorias] = await Promise.all([
    obtenerQuads(),
    obtenerClientes(),
    obtenerAlquileres(),
    obtenerRutas(),
    obtenerCategorias()
  ]);
 
  const ahora = new Date();
 
  // Obtengo el nimero de quads disponibles y alquilados
  const quadsDisponibles = quads.filter(quad => quad.estado === "Disponible").length;
  const quadsAlquilados  = quads.filter(quad => quad.estado === "Alquilado").length;
 
  //Obtengo los alquileres activos
  const alquileresActivos = alquileres.filter(alquiler => new Date(alquiler.fechaFin) >= ahora).length;
 

// Filtro solo los alquileres de este año para calcular los ingresos
const ingresoTotal = alquileres
  .filter(alquiler => new Date(alquiler.fechaInicio).getFullYear() === ahora.getFullYear())
  .reduce((sum, alquiler) => sum + (Number(alquiler.precioFinal) || 0), 0);
 
  return (
    <main>
       <Link href="/" className="volver">← Volver a Inicio</Link>
      <h1>Dashboard</h1>
 
      {/* Creo unas tarjetas resumen con toda la informacion de mi app */}
      <div className="grid">
        <div className="card">
          <h2>Quads: {quads.length}</h2>
          <p><span className="badge badge-verde"> {quadsDisponibles} disponibles</span></p>
          <p><span className="badge badge-amarillo"> {quadsAlquilados} alquilados</span></p>
          <Link href="/quads">Ver quads</Link>
        </div>
        <div className="card">
          <h2>Clientes: {clientes.length}</h2>
          <Link href="/clientes">Ver clientes</Link>
        </div>
        <div className="card">
          <h2>Alquileres: {alquileres.length}</h2>
          <p><span className="badge badge-azul">{alquileresActivos} activos</span></p>
          <Link href="/alquileres">Ver alquileres</Link>
        </div>
        <div className="card">
          <h2>Rutas: {rutas.length}</h2>
          <Link href="/rutas">Ver rutas</Link>
        </div>
        <div className="card">
          <h2>Categorias: {categorias.length}</h2>
          <Link href="/categorias">Ver Categorias</Link>
        </div>
        <div className="card">
          <h2>{ingresoTotal.toFixed(2)}€</h2>
          <p>Ingresos Anuales</p>
        </div>


      </div>
 
      {/* Muestro los 3 ultimos alquileres creados */}
      <h2 style={{ marginTop: "40px" }}>Últimos alquileres</h2>
      <div className="listado">
        {alquileres.slice(-3).reverse().map(alquiler => (
          <div key={alquiler.idAlquiler} className="item">
            <p><strong>#{alquiler.idAlquiler}</strong> — {alquiler.marca}</p>
            {/* Cuando hago clic en el nombre del cliente voy directo a su ficha */}
            <p>Cliente: <Link href={`/clientes/${alquiler.idCliente}`}>{alquiler.nombre}</Link></p>
            <p>Precio: {alquiler.precioFinal}€</p>
            <Link href={`/alquileres/${alquiler.idAlquiler}`}>Ver</Link>
          </div>
        ))}
      </div>
    </main>
  );
}