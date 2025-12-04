
import { useState, useEffect } from 'react';

function PostDetailsNombre({ searchUser }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    if (!searchUser) {
      setPosts([]);
      return;
    }

    //Programo la petición
    const timeoutId = setTimeout(() => {
      fetch(`https://jsonplaceholder.typicode.com/users?username=${searchUser}`)
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((error) => console.error('Error al cargar los usuarios:', error));
    }, 500);

    //Limpio
    return () => {
      clearTimeout(timeoutId);
    };
    //Filtro el usuario que coincide con el input
  }, [searchUser]);

  if (posts.length > 0) {
    return (
      <div>
        <h2>Lista de Usuarios</h2>

        {posts.map((user) => (
          <div key={user.id}>
            <h1>{user.username}</h1>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}

      </div>
    );
  }

  return <p>No hay resultados</p>;
}

export default PostDetailsNombre;
