import ItemCarrito from "./ItemCarrito";

export default function Carrito({
  items,
  onIncrementar,
  onDecrementar,
  onEliminar,
  total
}) {
  return (
    <div className="carrito">
      <h2>Mi Carrito</h2>

      {items.length === 0 && <p>El carrito está vacío</p>}

      {items.map(item => (
        <ItemCarrito
          key={item.id}
          item={item}
          onIncrementar={onIncrementar}
          onDecrementar={onDecrementar}
          onEliminar={onEliminar}
        />
      ))}

      <h3 className="total">Total: ${total.toFixed(2)}</h3>
    </div>
  );
}
