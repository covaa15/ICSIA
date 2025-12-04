import { useState } from 'react';
import PostComments from './componentes/PostComments.jsx';

function App() {
  const [postId, setPostId] = useState(1); 

  return (
    <div>
      <h1>Buscar Comentarios por Post</h1>

      <label htmlFor="postId">ID del Post: </label>
      <input
        id="postId"
        type="number"
        min="1"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
      />

      <PostComments postId={postId} />
    </div>
  );
}

export default App;
