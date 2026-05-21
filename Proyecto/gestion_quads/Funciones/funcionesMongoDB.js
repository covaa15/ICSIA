import { conectarMongo } from '../conexiones/dbMongoDB.js';
import ruta from '../modeloRuta/esquemaRuta.js';

//Funcion que obtiene todas las rutas
export async function obtenerRutas() {
  await conectarMongo();
  return await ruta.find();
}

//Funcion que obtiene una rta en concreto
export async function obtenerRutaID(id) {
  await conectarMongo();
  return await ruta.findById(id);
}


//Funcion que se encargar de insertar una ruta
export async function insertarRuta(data) {
  await conectarMongo();
  const nueva = new ruta(data);
  return await nueva.save();
}


//Funcion que se encarga de actualizar una Ruta
export async function actualizarRuta(id, data) {
  await conectarMongo();
  await ruta.findByIdAndUpdate(id, data);
}

//Funcion que se encarga de eliminar una ruta
export async function eliminarRuta(id) {
  await conectarMongo();
  await ruta.findByIdAndDelete(id);
}
