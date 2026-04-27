import Link from 'next/link';
import { getMovieById, getCastByMovieId } from '../../../funciones/funciones.js';

export default async function PaginaDetallePelicula({ params }) {
    const { movieId } = await params;
    const pelicula = getMovieById(movieId);
    const reparto = getCastByMovieId(movieId);

    return (
        <main>
            <section>
                <img src={pelicula.poster} alt={pelicula.title} width="300" />
                <h1>{pelicula.title}</h1>
                <p><strong>Año:</strong> {pelicula.year}</p>
                <p><strong>Director:</strong> {pelicula.director}</p>
                <p>{pelicula.synopsis}</p>
            </section>

            <hr />

            <section>
                <h2>Reparto Principal</h2>
                <ul>
                    {reparto.map(actor => (
                        <li key={actor.id}>
                            <Link href={`/actors/${actor.id}`}>
                                <strong>{actor.name}</strong>
                            </Link> 
                            <span> hace de {actor.character}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}