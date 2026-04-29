import Link from 'next/link';
import { crearReceta } from '../../../funciones/funciones.js';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// Creo una nueva receta
async function guardarReceta(formData) {
    "use server";

    const data = {
        titulo: formData.get('titulo'),
        descripcion_corta: formData.get('descripcion_corta'),
        ingredientes: formData.get('ingredientes'),
        instrucciones: formData.get('instrucciones'),
        tiempo_coccion: formData.get('tiempo_coccion'),
    };

    // Compruebo que todos los campos esten cubierotos
    if (Object.values(data).some(v => !v)) {
        throw new Error('Todos los campos son obligatorios');
    }

    const id = await crearReceta(data);

    // Actualizo el contenido de la pagina principal
    revalidatePath('/');

    // Voy a la receta nueva
    redirect(`/recetas/${id}`);
}

export default function NuevaReceta() {
    return (
        <main>
            <h1>Nueva Receta</h1>

            <Link href="/">Volver al inicio</Link>

            <form action={guardarReceta}>
                <input name="titulo" placeholder="Título" />
                <input name="descripcion_corta" placeholder="Descripción" />
                <textarea name="ingredientes" placeholder="Ingredientes" />
                <textarea name="instrucciones" placeholder="Instrucciones" />
                <input name="tiempo_coccion" placeholder="Tiempo" />

                <button type="submit">Crear</button>
            </form>
        </main>
    );
}