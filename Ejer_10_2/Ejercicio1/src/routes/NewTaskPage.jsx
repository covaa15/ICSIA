import { Form, redirect } from "react-router-dom";
import { crearTarea } from "../utils/api.js";


export async function action({ request, params }) {

  // Obtengo los datos enviados desde el formulario
  const datosFormulario = await request.formData();

  const titulo = datosFormulario.get("titulo");

  // Valido que el titulo no este vacio
  if (!titulo) {
    return { error: "El título de la tarea es obligatorio" };
  }

  // Creo la tarea
  await crearTarea(params.projectId, titulo);

  // Vuelvo a la pagina del proyecto
  return redirect(`/projects/${params.projectId}`);
}

function NewTaskPage() {

  return (
    <div>

      <h2>Añadir Nueva Tarea</h2>

      <Form method="post">

        <input
          name="titulo"
          placeholder="Título de la tarea"
        />

        <button>
          Añadir Tarea
        </button>

      </Form>

    </div>
  );
}

export default NewTaskPage;