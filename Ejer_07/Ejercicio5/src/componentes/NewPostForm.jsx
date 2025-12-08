import { useState, useCallback, useEffect } from "react";

function NewPostForm() {
  // Estados del formulario
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Estado donde guardamos los posts creados
  const [postCreado, setPostCreado] = useState(null);

  // Función para crear un post 
  const addPost = useCallback(async () => {
    if (!title || !body) return;

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });

      const data = await response.json();
      setPostCreado(data); // Guardamos el post creado
      // Limpiamos el formulario
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error al crear el post:", error);
    }
  }, [title, body]);

  // Efecto que se ejecuta cuando se crea un post
  useEffect(() => {
    if (postCreado) {
      console.log("Post creado con éxito:", postCreado);
    }
  }, [postCreado, addPost]);

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    addPost();
  };

  return (
    <div>
      <h2>Crear nuevo Post</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Contenido:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <button type="submit">Crear Post</button>
      </form>

      {postCreado && (
        <p style={{ color: "green" }}>
          Post creado 
        </p>
      )}
    </div>
  );
}

export default NewPostForm;
