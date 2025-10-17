import '../css/cabeceraFicha.css';

/*Creo una funcion cabeceraFicha que recibe com parametros el nombre y el vendedor.
Posteriomente muestro el nombre del producto, el del vendedor y su valoracion
*/
export default function CabeceraFicha({ nombre, vendedor }) {
  return (
    <div className="cabecera-ficha">
      <h2>{nombre}</h2>
      <p>
        <strong>Vendedor: {vendedor.nombre}<br></br>Valoración:</strong> {vendedor.rating}
      </p>
    </div>
  );
}
