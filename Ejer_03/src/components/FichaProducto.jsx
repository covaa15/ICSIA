// import ImagenProducto from './ImagenProducto.jsx';
// import '../css/fichaProducto.css';

// export default function FichaProducto({ producto, children }) {
//   const { nombre, descripcion, precio, imagenURL } = producto;

//   return (
//     <div className="ficha-producto">
//       <ImagenProducto url={imagenURL} nombre={nombre} />
//       <h2>{nombre}</h2>
//       <p>{descripcion}</p>
//       <p className="precio">${precio.toFixed(2)}</p>
//       {children}
//     </div>
//   );
// }

import CabeceraFicha from './CabeceraFicha.jsx';
import ImagenProducto from './ImagenProducto.jsx';
import DetallesProducto from './DetallesProducto.jsx';
import PieFicha from './PieFicha.jsx';
import '../css/fichaProducto.css';

/*Creo una funcion FichaProducto que recibe un producto y un hijo.
A la ficha le paso los daros de la cabecera, las imagenes, los detalles del producto
y el pie de la ficha que importo de sus respectivos scripsts y construllo la ficha*/
export default function FichaProducto({ producto, children }) {
  return (
    <div className="ficha-producto">
      <CabeceraFicha nombre={producto.nombre} vendedor={producto.vendedor} />
      <ImagenProducto url={producto.imagenes[0]} alt={producto.nombre} />
      <DetallesProducto caracteristicas={producto.caracteristicas}>
        {children}
      </DetallesProducto>
      <PieFicha precio={producto.precio} enStock={producto.enStock} />
    </div>
  );
}
