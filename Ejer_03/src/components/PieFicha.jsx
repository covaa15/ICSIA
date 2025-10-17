import '../css/pieFicha.css';
/*PieFicha recibe el precio y el estado del producto
y dependiendo de como se encuentra el producto muestra el precio o no
o indica si esta en oferta*/
export default function PieFicha({ precio, enStock }) {
  return (
    <div className="pie-ficha">
      {enStock ? (
        <p className="precio">
          {precio.moneda}{precio.valor.toFixed(2)}{' '}
          {precio.enOferta && <span className="oferta">¡OFERTA!</span>}
        </p>
      ) : (
        <p className="sin-stock">No disponible </p>
      )}
    </div>
  );
}
