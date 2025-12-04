import { useState } from 'react';
import PostDetails from '../componentes/PostDetails.jsx';

function App() {

  const [id, setId ]= useState();

  return (

    <div>
      <label>Id </label>
      <input type='number' min='0' onInput={(e) => setId(e.target.value)} />
      <PostDetails idPost={id} />
    </div>
  );
}




export default App;
