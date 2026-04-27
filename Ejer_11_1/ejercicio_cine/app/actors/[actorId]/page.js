import Link from 'next/link';
import { getActorById, getFilmographyByActorId } from '../../../funciones/funciones.js';

export default async function PaginaPerfilActor({ params }) {
    const { actorId} = await params;
    const actor = getActorById(actorId);
    const filmografia = getFilmographyByActorId(actorId);

    return (
        <main>
            <section>
                <img src={actor.photo} alt={actor.name} width="200" />
                <h1>{actor.name}</h1>
                <p><strong>Año de nacimiento:</strong> {actor.birthYear}</p>
                <p>{actor.bio}</p>
            </section>

            <hr />

            <section>
                <h2>Filmografía (Películas en las que sale)</h2>
                <div style={{ display: 'flex', gap: '20px' }}>
                    {filmografia.map(pelicula => (
                        <article key={pelicula.id}>
                            <img src={pelicula.poster} alt={pelicula.title} width="100" />
                            <br />
                            <Link href={`/movies/${pelicula.id}`}>
                                {pelicula.title}
                            </Link>
                            <p><small>Papel: {pelicula.character}</small></p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}