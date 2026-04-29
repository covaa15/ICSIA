import Link from 'next/link';
import { obtenerTodasRecetas } from '../funciones/funciones.js';

export default async function Home() {
    // Obtengo todas las recetas
    const recetas = await obtenerTodasRecetas();

    return (
        <main>
            <h1>Blog de Recetas</h1>

            <Link href="/recetas/nueva">
                Crear Nueva Receta
            </Link>

            <ul>
                {recetas.map(receta => (
                    <li key={receta.id}>
                        <Link href={`/recetas/${receta.id}`}>
                            {receta.titulo}
                        </Link>
                        <p>{receta.descripcion_corta}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}