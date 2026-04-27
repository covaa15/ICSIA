import Link from 'next/link';
import { getAllActors } from '../../funciones/funciones.js';

export default function PaginaListaActores() {
    const todosLosActores = getAllActors();

    return (
        <main>
            <h1>Nuestros Actores</h1>
            <ul>
                {todosLosActores.map(actor => (
                    <li key={actor.id}>
                        <Link href={`/actors/${actor.id}`}>
                            {actor.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}