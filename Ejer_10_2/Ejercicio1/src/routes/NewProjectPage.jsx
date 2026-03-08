import {Form,redirect,useActionData,useNavigation} from "react-router-dom";

import { crearProyecto } from "../utils/api.js";


export async function action({ request }) {

  const datos = await request.formData();

  const nombre = datos.get("nombre");
  const descripcion = datos.get("descripcion");

  const errores = {};

  // Compruebo que el nombre tenga al menos 5 caracteres
  if (!nombre || nombre.length < 5) {
    errores.nombre = "El nombre debe tener al menos 5 caracteres";
  }

  // Si hay errores los devuelvo al formulario
  if (Object.keys(errores).length > 0) {
    return errores;
  }

  // Creo el proyecto
  crearProyecto(nombre, descripcion);

  // Vuelvo a la lista de proyectos
  return redirect("/projects");
}


export default function NewProjectPage() {
  const errores = useActionData();
  const navigation = useNavigation();

  const enviando = navigation.state === "submitting";

  return (
    <div className="card">
      <h2>Crear Nuevo Proyecto</h2>

      <Form method="post">

        <label>Nombre del Proyecto</label>
        <input type="text" name="nombre" />

        {errores?.nombre && <p className="error">{errores.nombre}</p>}

        <label>Descripción</label>
        <textarea name="descripcion"></textarea>

        <button disabled={enviando}>
          {enviando ? "Guardando Proyecto..." : "Crear Proyecto"}
        </button>

      </Form>
    </div>
  );
}
