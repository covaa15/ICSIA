import { memo } from "react";

const ItemProducto = memo(({ producto, onAgregar }) => {
  return (
    <div className="card">
      <h3>{producto.nombre}</h3>
      <p>Precio: ${producto.precio.toFixed(2)}</p>
      <button onClick={() => onAgregar(producto)}>
        Añadir al carrito
      </button>
    </div>
  );
});

export default ItemProducto;
