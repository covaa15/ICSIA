import '../css/detalleProducto.css';

/*Creo la función DetallesProducro que recibe por parametros las caracteristicas y los hijos del producto
Luefo usado un map recorro todas las caracteristicas y coy creando la lista por cada elemento */
export default function DetallesProducto({ caracteristicas, children }) {
  return (
    <div className="detalles-producto">
      <ul>
        {caracteristicas.map((caracteristica, indice) => (
          <li key={indice}>{caracteristica}</li>
        ))}
      </ul>
      {children}
    </div>
  );
}
