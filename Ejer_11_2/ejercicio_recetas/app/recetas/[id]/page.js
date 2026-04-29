import Link from 'next/link';
import { obtenerReceta, obtenerComentariosReceta, eliminarReceta, crearComentario } from '../../../funciones/funciones.js';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// Borro una receta
async function borrarReceta(id) {
    "use server";

    await eliminarReceta(id);

    revalidatePath('/');

    // Vuelvo a la ventana de inico
    redirect('/');
}

// Añado un comentario
async function añadirComentario(formData) {
    "use server";

    const id = formData.get('receta_id');

    const data = {
        receta_id: id,
        autor: formData.get('autor'),
        texto: formData.get('texto'),
    };

    await crearComentario(data);

    // Refresco la ventana de la receta 
    revalidatePath(`/recetas/${id}`);
}

export default async function detalleReceta({ params }) {
    const { id } = await params;

    const receta = await obtenerReceta(id);
    const comentarios = await obtenerComentariosReceta(id);

    return (
        <main>
            <Link href="/">Volver al inicio</Link>

            <h1>{receta.titulo}</h1>
            <p>{receta.descripcion_corta}</p>
            <p>{receta.ingredientes}</p>
            <p>{receta.instrucciones}</p>
            <p>{receta.tiempo_coccion}</p>

            <Link href={`/recetas/${id}/editar`}>
                Editar receta
            </Link>

            <form action={borrarReceta.bind(null, id)}>
                <button type="submit">Borrar</button>
            </form>

            <hr />

            <h2>Comentarios</h2>

            {comentarios.map(comentario => (
                <div key={comentario.id}>
                    <strong>{comentario.autor}</strong>
                    <p>{comentario.texto}</p>
                </div>
            ))}

            <form action={añadirComentario}>
                <input type="hidden" name="receta_id" value={id} />
                <input name="autor" placeholder="Autor" />
                <textarea name="texto" placeholder="Comentario" />
                <button type="submit">Comentar</button>
            </form>
        </main>
    );
}