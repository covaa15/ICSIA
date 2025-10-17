import FichaProducto from './components/FichaProducto.jsx';
import { productos } from './datos/Productos.js';
import './css/app.css';

function App() {
  return (
    <div className="App">
      <h1>Tienda de Productos</h1>

      <div className="lista-productos">
        {productos.map((prod) => (
          <FichaProducto key={prod.id} producto={prod}>
            <button className="btn-carrito">Añadir al carrito 🛒</button>
          </FichaProducto>
        ))}
      </div>
    </div>
  );
}

export default App;
