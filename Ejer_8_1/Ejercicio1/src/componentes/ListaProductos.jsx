import ItemProducto from "./ItemProducto.jsx";

export default function ListaProductos({ productos, onAgregar }) {
  return (
    <div className="productos">
      <h2>Productos Disponibles</h2>

      <div className="grid">
        {productos.map(p => (
          <ItemProducto key={p.id} producto={p} onAgregar={onAgregar} />
        ))}
      </div>
    </div>
  );
}
