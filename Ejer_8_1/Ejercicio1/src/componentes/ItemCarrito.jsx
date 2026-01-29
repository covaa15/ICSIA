import { memo } from "react";

const ItemCarrito = memo(function ItemCarrito({
  item,
  onIncrementar,
  onDecrementar,
  onEliminar
}) {
  return (
    <div>
      <span>
        {item.nombre} – {item.precio}€ x {item.cantidad}
      </span>

      <button onClick={() => onIncrementar(item.id)}>+</button>
      <button onClick={() => onDecrementar(item.id)}>-</button>
      <button onClick={() => onEliminar(item.id)}>Eliminar</button>
    </div>
  );
});

export default ItemCarrito;
