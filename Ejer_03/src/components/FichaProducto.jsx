import ImagenProducto from './ImagenProducto.jsx';
import '../css/fichaProducto.css';

export default function FichaProducto({ producto, children }) {
  const { nombre, descripcion, precio, imagenURL } = producto;

  return (
    <div className="ficha-producto">
      <ImagenProducto url={imagenURL} nombre={nombre} />
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <p className="precio">${precio.toFixed(2)}</p>
      {children}
    </div>
  );
}

