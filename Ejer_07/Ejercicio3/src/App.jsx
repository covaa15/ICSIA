import { useState } from 'react';
import PostDetailsNombre from '../componentes/PostDetailsNombre.jsx';

function App() {

  const [texto, setTexto] = useState();

  return (

    <div>
      <label>Buscar Usuario: </label>
      <input type='text' onInput={(e) => setTexto(e.target.value)} />
      <PostDetailsNombre searchUser={texto} />
    </div>
  );
}




export default App;
