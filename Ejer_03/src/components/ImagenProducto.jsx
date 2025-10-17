import '../css/imagenProducto.css';

/*Esta funcion recibe la url y el alt de la imagen y lo que 
va a hacer es mostrar la imagen detro de la ficha
*/
export default function ImagenProducto({ url, nombre }) {
  return <img src={url} alt={nombre} className="imagen-producto" />;
}


