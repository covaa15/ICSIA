import {useLoaderData,useSubmit,useFetcher,Link,redirect} from "react-router-dom";

import {obtenerProyecto,obtenerTareas,toggleTarea,eliminarTarea,eliminarProyecto} from "../utils/api.js";

// Cargo el proyecto y sus tareas
export function loader({ params }) {

  const proyecto = obtenerProyecto(params.projectId);

  const tareas = obtenerTareas(params.projectId);

  return { proyecto, tareas };
}

export async function action({ request, params }) {

  const datos = await request.formData();

  const tipo = datos.get("tipo");

  if (tipo === "toggle") {

    // Cambio el estado de la tarea
    toggleTarea(datos.get("tareaId"));

    return null;
  }

  if (tipo === "deleteTask") {

    // Elimino la tarea
    eliminarTarea(datos.get("tareaId"));

    return null;
  }

  if (tipo === "deleteProject") {

    // Elimino el proyecto
    eliminarProyecto(params.projectId);

    // Vuelvo a la lista de proyectos
    return redirect("/projects");
  }
}


export default function ProjectDetailsPage() {
  const { proyecto, tareas } = useLoaderData();

  const submit = useSubmit();
  const fetcher = useFetcher();

  //Envio el formulario indicando que quiero eliminar el proyecto
  function eliminarProyectoHandler() {

    if (window.confirm("¿Seguro que quieres eliminar este proyecto?")) {

      submit({ tipo: "deleteProject" }, { method: "post" });
  
    }
  }
  

  return (
    <div className="card">
      <h2>{proyecto.nombre}</h2>
      <p>{proyecto.descripcion}</p>

      <button onClick={eliminarProyectoHandler}>Eliminar Proyecto</button>

      <Link to="new-task">Añadir Tarea</Link>

      <h3>Tareas</h3>

      {tareas.map((tarea) => (
        <div key={tarea.id} className="tarea">

          <span>
            {tarea.titulo} {tarea.completada ? "Sí" : "No"}
          </span>

          <fetcher.Form method="post">
            <input type="hidden" name="tipo" value="toggle" />
            <input type="hidden" name="tareaId" value={tarea.id} />
            <button>Marcar</button>
          </fetcher.Form>

          <button
            onClick={() => {
              if (window.confirm("¿Eliminar tarea?")) {
                submit(
                  { tipo: "deleteTask", tareaId: tarea.id },
                  { method: "post" }
                );
              }
            }}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}
