import FichaProducto from './FichaProducto.jsx';
import '../css/galeriaProductos.css';

/*Funcion Galeria de Productos que recibe el array de productos, lo recorre
y por cada producto crea su ficha.*/
export default function GaleriaProductos({ productos }) {
  return (
    <div className="lista-productos">
      {productos.map((producto) => (
        <FichaProducto key={producto.id} producto={producto}>
          <button>Más información</button>
        </FichaProducto>
      ))}
    </div>
  );
}
