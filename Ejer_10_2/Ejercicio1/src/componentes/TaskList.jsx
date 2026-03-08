import { useFetcher } from "react-router-dom";

//Muestro todas las tareas de un proyecto
function TaskList({ tareas }) {

  // Envio las acciones sin cambiar de pagina
  const fetcher = useFetcher();

  return (
    <div>

      <h3>Tareas</h3>
      {tareas.map((tarea) => (

        <div key={tarea.id}>

          <span>
            {tarea.titulo}
          </span>

          {tarea.completada && <span>Sí</span>}

          <fetcher.Form method="post">

            <input
              type="hidden"
              name="tipo"
              value="toggle"
            />

            <input
              type="hidden"
              name="idTarea"
              value={tarea.id}
            />

            <button>Cambiar estado</button>

          </fetcher.Form>

        </div>

      ))}

    </div>
  );
}

export default TaskList;