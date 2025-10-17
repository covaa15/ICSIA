import GaleriaProductos from './components/GaleriaProductos.jsx';
import { productos } from './datos/Productos.js';
import './css/app.css';

/*Desde aqui llamamos a la Galeria de productos pasandole como
parametro el array de productos creado anteriomente para que 
nos muestre la tienda en el navegador*/
function App() {
  return (
    <div className="App">
      <h1>Tienda de Productos</h1>
      <GaleriaProductos productos={productos} />
    </div>
  );
}

export default App;
