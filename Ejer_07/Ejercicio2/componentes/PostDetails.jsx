import { useState, useEffect } from 'react';

function PostDetails({ idPost }) {
  const [posts, setPosts] = useState();
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error al cargar los posts:', error));
  }, [idPost]);

  if (posts) {


    return (
      <div>
        <h2>Lista de Posts</h2>
        <h1>{posts.title}</h1>
        <p>{posts.body}</p>

      </div>
    );
  }
}

export default PostDetails;
