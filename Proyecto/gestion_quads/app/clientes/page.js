import Link from "next/link";
import { obtenerClientes } from "@/Funciones/funcionesMySQL";
 
export default async function Page({ searchParams }) {
  const clientes = await obtenerClientes();
 
  const params = await searchParams;

  const filtroBusqueda  = params?.busqueda?.toLowerCase() || "";
 
  // Filtro los clientes por nombre, email o telefono
  const clientesFiltrados = clientes.filter((cliente) =>
    !filtroBusqueda ||
    cliente.nombre?.toLowerCase().includes(filtroBusqueda) ||
    cliente.email?.toLowerCase().includes(filtroBusqueda) ||
    cliente.telefono?.includes(filtroBusqueda)
  );
 
  return (
    <main>
      <Link href="/" className="volver">← Volver a Inicio</Link>
      <h1>Clientes</h1>
      <Link href="/clientes/nuevoCliente" className="nuevo">+ Nuevo Cliente</Link>
 
      <form method="GET" className="filtros-inline">
        <input
          name="busqueda"
          placeholder="Buscar por nombre, email o teléfono..."
          defaultValue={params?.busqueda || ""}
          className="filtro-input"
        />
        <button type="submit" className="filtro-btn">Buscar</button>
        <Link href="/clientes" className="filtro-limpiar">Limpiar</Link>
      </form>
 
      {clientesFiltrados.length === 0 && (
        <p className="vacio">No existen clientes</p>
      )}
 
      <div className="listado">
        {clientesFiltrados.map(cliente => (
          <div key={cliente.idCliente} className="item">
            <h3>{cliente.nombre}</h3>
            <p>{cliente.email}</p>
            <p>{cliente.telefono}</p>

            
            {/* Cuando hago clic en el ver ficha voy directo a su ficha */}
            <Link href={`/clientes/${cliente.idCliente}`}>Ver ficha</Link>
          </div>
        ))}
      </div>
    </main>
  );
}