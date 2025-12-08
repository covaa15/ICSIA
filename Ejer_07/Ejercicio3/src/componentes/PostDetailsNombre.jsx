import { useState, useCallback, useEffect } from "react";

function FormularioNuevoPost() {

  // Estados del formulario
  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");

  // Estado donde guardo el post que se crea después del POST
  const [postCreado, setPostCreado] = useState(null);

  // Programo la función que hace la petición POST
  const agregarPost = useCallback(async () => {
    try {

      // Realizo la petición POST con los datos del formulario
      const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titulo, body: cuerpo }),
      });

      const datos = await respuesta.json();

      // Guardo el post 
      setPostCreado(datos);

    } catch (error) {
      console.error("Error al enviar el post:", error);
    }
  }, [titulo, cuerpo]); 


  // Ejecuto cuando se crea un post
  useEffect(() => {

    // Si ya tengo un post creado, muestro la información
    if (postCreado) {
      console.log("Post creado con éxito:", postCreado);
    }

  }, [postCreado, agregarPost]); 


  // Manejo del envío del formulario
  const manejarEnvio = (e) => {
    e.preventDefault();

    // Llamo a la función que hace el POST
    agregarPost();
  };

  return (
    <div>
      <h2>Crear nuevo Post</h2>

      <form onSubmit={manejarEnvio}>

        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div>
          <label>Contenido:</label>
          <textarea
            value={cuerpo}
            onChange={(e) => setCuerpo(e.target.value)}
          ></textarea>
        </div>

        <button type="submit">Crear Post</button>
      </form>

      {postCreado && (
        <p style={{ color: "green" }}>
          Post creado con ID: {postCreado.id}
        </p>
      )}
    </div>
  );
}

export default FormularioNuevoPost;
