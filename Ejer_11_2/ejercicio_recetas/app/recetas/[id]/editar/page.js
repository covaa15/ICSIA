import Link from 'next/link';
import { obtenerReceta, actualizarReceta } from '../../../../funciones/funciones.js';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// Edito una receta
async function editarReceta(id, formData) {
    "use server";

    const data = {
        titulo: formData.get('titulo'),
        descripcion_corta: formData.get('descripcion_corta'),
        ingredientes: formData.get('ingredientes'),
        instrucciones: formData.get('instrucciones'),
        tiempo_coccion: formData.get('tiempo_coccion'),
    };

    await actualizarReceta(id, data);

    // Actualizo la ventaa inicial y la de detallas
    revalidatePath('/');
    revalidatePath(`/recetas/${id}`);

    // Vuelvo a a la ventana de detalles
    redirect(`/recetas/${id}`);
}

export default async function Editar({ params }) {
    const { id } = await params;

    const receta = await obtenerReceta(id);

    return (
        <main>
            <Link href={`/recetas/${id}`}>
                Volver a la receta
            </Link>

            <h1>Editar Receta</h1>

            <form action={editarReceta.bind(null, id)}>
                <input name="titulo" defaultValue={receta.titulo} />
                <input name="descripcion_corta" defaultValue={receta.descripcion_corta} />
                <textarea name="ingredientes" defaultValue={receta.ingredientes} />
                <textarea name="instrucciones" defaultValue={receta.instrucciones} />
                <input name="tiempo_coccion" defaultValue={receta.tiempo_coccion} />

                <button type="submit">Guardar</button>
            </form>
        </main>
    );
}