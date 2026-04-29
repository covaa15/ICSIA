// funciones/funciones.js

import { conexionBD } from '../db.js';


// Funcion que obtiene todas las recetas
export async function obtenerTodasRecetas() {

    //Con el codigo siguiente comentado, lo que hago es forzar para que se vea el cargando de la pagina

       // await new Promise(r => setTimeout(r, 1500));

    // Hacemos la consulta SQL para sacar todas las recetas
    const [recetas] = await conexionBD.query(
        'SELECT * FROM recetas ORDER BY fecha_creacion DESC'
    );

    return recetas;
}


// Funcion que obtiene una receta por ID
export async function obtenerReceta(id) {
    // Buscamos la receta concreta usando su id
    const [recetas] = await conexionBD.query(
        'SELECT * FROM recetas WHERE id = ?',
        [id]
    );

    // Devolvemos solo la primera porque solo habrá una
    return recetas[0];
}


// Funcion que crea una nueva receta
export async function crearReceta(data) {
    const {
        titulo,
        descripcion_corta,
        ingredientes,
        instrucciones,
        tiempo_coccion
    } = data;

    // Insertamos una nueva receta en la base de datos
    const [resultado] = await conexionBD.query(
        `INSERT INTO recetas
        (titulo, descripcion_corta, ingredientes, instrucciones, tiempo_coccion, fecha_creacion)
        VALUES (?, ?, ?, ?, ?, NOW())`,
        [
            titulo,
            descripcion_corta,
            ingredientes,
            instrucciones,
            tiempo_coccion
        ]
    );

    // Devolvemos el id de la receta nueva
    return resultado.insertId;
}


// Funcion que actualiza una receta existente
export async function actualizarReceta(id, data) {
    const {
        titulo,
        descripcion_corta,
        ingredientes,
        instrucciones,
        tiempo_coccion
    } = data;

    // Actualizamos los datos de la receta
    await conexionBD.query(
        `UPDATE recetas
         SET titulo = ?, descripcion_corta = ?, ingredientes = ?, instrucciones = ?, tiempo_coccion = ?
         WHERE id = ?`,
        [
            titulo,
            descripcion_corta,
            ingredientes,
            instrucciones,
            tiempo_coccion,
            id
        ]
    );
}


// Funcion que elimina una receta
export async function eliminarReceta(id) {
    // Borramos la receta por su id
    await conexionBD.query(
        'DELETE FROM recetas WHERE id = ?',
        [id]
    );
}


// Funcion que obtiene los comentarios de una receta
export async function obtenerComentariosReceta(id) {
    // Sacamos todos los comentarios relacionados con esa receta
    const [comentarios] = await conexionBD.query(
        'SELECT * FROM comentarios WHERE receta_id = ? ORDER BY fecha_creacion DESC',
        [id]
    );

    return comentarios;
}


// Funcion que crea un comentario nuevo
export async function crearComentario(data) {
    const {
        receta_id,
        autor,
        texto
    } = data;

    // Insertamos el comentario en la base de datos
    await conexionBD.query(
        `INSERT INTO comentarios
        (receta_id, autor, texto, fecha_creacion)
        VALUES (?, ?, ?, NOW())`,
        [
            receta_id,
            autor,
            texto
        ]
    );
}