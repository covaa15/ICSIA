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
      <ol>
        {posts.map((post) => (
          <li data_userID={post.userId} key={post.id}>
            
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            </li>

        ))}
      </ol>
    </div>
  );
}

export default PostList;
