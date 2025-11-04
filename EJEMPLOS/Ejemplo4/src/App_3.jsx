import { useState } from 'react';

const INITIAL_PRODUCTS = [
  { id: 'p1', title: 'React - The Complete Guide [Course]', price: 19.99 },
  { id: 'p2', title: 'Stylish Chair', price: 329.49 },
  { id: 'p3', title: 'Ergonomic Chair', price: 269.99 },
  { id: 'p4', title: 'History Video Game Collection', price: 99.99 },
];

function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  function handleAddProduct() {
    // React, al utilizar funciones flecha
    // me mete el estado actual como argumento
    // curProducts EN NUESTRO CASO
    // y me devuelve el nuevo estado
    setProducts((curProducts) =>
      // cuidado con no mutar el estado anterior
      // uso concat para crear un nuevo array
      // push aquí 
      //añado otro producto al array
      curProducts.concat({
        // de nuevo la trampa de inventarse un id único
        //  fecha actual en milisegundos
        id: new Date().getTime(),
        title: 'Another new product',
        price: 15.99,
      })
    );
  }

  return (
    <section>
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        // el map de react necesita un key único para cada elemento
        // uso el id del producto como key
        // que en el caso del nuevo producto es la fecha actual en milisegundos
        {products.map((product) => (
          <li key={product.id}>
            {product.title} (${product.price})
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;