import Link from "next/link";
 
// Esta pagina la muestro cuando no encuentra la ruta o el recurso
export default function NotFound() {
  return (
    <main style={{ textAlign: "center", paddingTop: "100px" }}>
      <h1 style={{ fontSize: "80px", color: "#2563eb" }}>404</h1>
      <h2>Pagina no encontrada</h2>
      <p style={{ color: "#64748b", marginBottom: "30px" }}>
        La ruta a la pagina puede estar mal o estar esta eliminada
      </p>
      <Link href="/" className="nuevo">← Volver al inicio</Link>
    </main>
  );
}