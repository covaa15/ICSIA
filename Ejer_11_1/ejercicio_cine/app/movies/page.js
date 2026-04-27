import Link from 'next/link';
import { getAllMovies } from '../../funciones/funciones.js';

export default function PaginaPeliculas() {
    const todasLasPelis = getAllMovies();

    return (
        <main className="prueba">
            <h1>Cartelera de Peliculas</h1>
            <section style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {todasLasPelis.map(pelicula => (
                    <article key={pelicula.id} style={{ width: '200px' }}>
                        <img src={pelicula.poster} alt={pelicula.title} style={{ width: '100%' }} />
                        <Link href={`/movies/${pelicula.id}`}>
                            <h3>{pelicula.title}</h3>
                        </Link>
                        <p>{pelicula.year}</p>
                    </article>
                ))}
            </section>
        </main>
    );
}