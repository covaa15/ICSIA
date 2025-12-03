import { useState, useEffect } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]); 

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error al cargar los posts:', error));
  }, []); 

  return (
    <div>
      <h2>Lista de Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
