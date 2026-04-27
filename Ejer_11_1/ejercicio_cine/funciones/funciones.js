import { MOVIES as peliculas, ACTORS as actores, ROLES as roles } from '../datos/datos.js';

// Funcion con la que otenemos todas las pelis
export function getAllMovies() {
    return peliculas;
}

// Funcion para buscar una peli por su id
export function getMovieById(idBuscado) {
    const peliculaEncontrada = peliculas.find(pelicula => pelicula.id === idBuscado);
    return peliculaEncontrada;
}

// Funcion con la que otenemos todos los actores
export function getAllActors() {
    return actores;
}

// Funcion para buscar un actor a partir de su id
export function getActorById(idBuscado) {
    const actorEncontrado = actores.find(actor => actor.id === idBuscado);
    return actorEncontrado;
}

// Funcion para sacar los actores de una peli junto con sus datos personales
export function getCastByMovieId(idDeLaPelicula) {
    // Obtengo los roles que pertenecen a esta peli
    const rolesDeLaPelicula = roles.filter(rol => rol.movieId === idDeLaPelicula);
    
    // Busco la informacion de cada actor y la uno con la de su personaje
    const repartoCompleto = rolesDeLaPelicula.map(rol => {
        const actorInfoCompleta = actores.find(actor => actor.id === rol.actorId);
        const actorConPersonaje = { 
            ...actorInfoCompleta, 
            character: rol.character 
        };
        return actorConPersonaje;
    });

    return repartoCompleto;
}

// Funcion para sacar las pelis de un actor junto con los datos de la peli
export function getFilmographyByActorId(idDelActor) {
    // Obtengo los roles donde aparece este actor
    const rolesDelActor = roles.filter(rol => rol.actorId === idDelActor);

    // Obtengo la informacion de la peli y la junto con el personaje 
    const listaPeliculas = rolesDelActor.map(rol => {
        const peliculaInfoCompleta = peliculas.find(pelicula => pelicula.id === rol.movieId);
        const peliculaConPersonaje = { 
            ...peliculaInfoCompleta, 
            character: rol.character 
        };
        return peliculaConPersonaje;
    });

    return listaPeliculas;
}