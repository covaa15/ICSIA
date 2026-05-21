import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Allande Aventuras</h1>

      {/* Menú principal con tarjetas para cada sección */}
      <div className="grid">
        <Link className="card" href="/dashboard">
          <img src="/imagenes/dashboard.png" alt="Dashboard" />
          <h2>Dashboard</h2>
        </Link>
        <Link className="card" href="/quads">
          <img src="/imagenes/quad.png" alt="Quads" />
          <h2>Quads</h2>
        </Link>
        <Link className="card" href="/clientes">
          <img src="/imagenes/clientes.png" alt="Clientes" />
          <h2>Clientes</h2>
        </Link>
        <Link className="card" href="/alquileres">
          <img src="/imagenes/alquiler.png" alt="Alquileres" />
          <h2>Alquileres</h2>
        </Link>
        <Link className="card" href="/categorias">
          <img src="/imagenes/categoria.png" alt="Categorías" />
          <h2>Categorías</h2>
        </Link>
        <Link className="card" href="/rutas">
          <img src="/imagenes/ruta.png" alt="Rutas" />
          <h2>Rutas</h2>
        </Link>
      </div>
    </main>
  );
}