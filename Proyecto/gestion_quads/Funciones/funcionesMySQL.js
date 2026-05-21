import { conexionBD } from '../conexiones/dbMySQL.js';

//Quads 


//Funcion que se encargar de obtener todos los quads de la bd
export async function obtenerQuads() {
  const [rows] = await conexionBD.query("SELECT * FROM quads");
  return rows;
}

//Funcion que se encarga de obtener un quad concreto
export async function obtenerQuad(id) {
  const [rows] = await conexionBD.query("SELECT * FROM quads WHERE idQuad=?", [id]);
  return rows[0];
}

// Compruebo si ya existe un quad con esa matricula
export async function obtenerQuadPorMatricula(matricula) {
  const [rows] = await conexionBD.query(
    "SELECT * FROM quads WHERE matricula=?",
    [matricula]
  );
  return rows[0];
}

//Funcion que se encarga de crear un nuevo quad
export async function crearQuad(quad) {
  const [res] = await conexionBD.query(
    `INSERT INTO quads (marca,modelo,matricula,precioDia,imagen,idCategoria)
       VALUES (?,?,?,?,?,?)`,
    [quad.marca, quad.modelo, quad.matricula, quad.precioDia, quad.imagen, quad.idCategoria]
  );
  return res.insertId;
}

//Funcion que se encarga de actualizar la informacion de un quad 
export async function actualizarQuad(id, quad) {
  await conexionBD.query(
    `UPDATE quads 
       SET marca=?, modelo=?, matricula=?, precioDia=?, imagen=?, idCategoria=? 
       WHERE idQuad=?`,
    [quad.marca, quad.modelo, quad.matricula, quad.precioDia, quad.imagen, quad.idCategoria, id]
  );
}

//Funcion que se encarga de eliminar un quad
export async function eliminarQuad(id) {
  await conexionBD.query("DELETE FROM quads WHERE idQuad=?", [id]);
}

// Compruebo si el quad tiene alquileres que se solapen con las fechas dadas
export async function obtenerAlquileresQuadFechas(idQuad, fechaInicio, fechaFin) {
  const [rows] = await conexionBD.query(
    `SELECT COUNT(*) AS total FROM alquileres 
     WHERE idQuad = ? 
     AND fechaInicio < ? 
     AND fechaFin > ?`,
    [idQuad, fechaFin, fechaInicio]
  );
  return rows[0].total;
}

//Funcion que se encarga de obtener el precio del dia del quad
export async function obtenerPrecioDia(id) {
  const [rows] = await conexionBD.query("SELECT precioDia FROM quads WHERE idQuad=?", [id]);
  return rows[0];
}

export async function obtenerQuadsCategoria(id) {
  const [rows] = await conexionBD.query(
    "SELECT COUNT(*) AS total FROM quads WHERE idCategoria=?",[id] );
  return rows[0].total;
}



//Clientes


//Funcion que obtiene todos los clientes
export async function obtenerClientes() {
  const [rows] = await conexionBD.query("SELECT * FROM clientes");
  return rows;
}

//Funcion que obtiene un cliente
export async function obtenerCliente(id) {
  const [rows] = await conexionBD.query(
    "SELECT * FROM clientes WHERE idCliente=?",
    [id]
  );
  return rows[0];
}

//Funcion que crea un nuevo cliente
export async function crearCliente(cliente) {
  await conexionBD.query(
      "INSERT INTO clientes (nombre,email,telefono) VALUES (?,?,?)",
      [cliente.nombre,cliente.email,cliente.telefono]
  );
}

//Funcion que actualiza un cliente
export async function actualizarCliente(id, cliente) {
  await conexionBD.query(
      `UPDATE clientes 
       SET nombre=?, email=?, telefono=? 
       WHERE idCliente=?`,
      [cliente.nombre,cliente.email,cliente.telefono,id]
  );
}

//Funcion para eliminar un cliente
export async function eliminarCliente(id) {
  await conexionBD.query(
      "DELETE FROM clientes WHERE idCliente=?",
      [id]
  );
}

// Compruebo si ya existe un cliente con ese email
export async function obtenerClientePorEmail(email) {
  const [rows] = await conexionBD.query(
    "SELECT * FROM clientes WHERE email=?",
    [email]
  );
  return rows[0];
}



//Alquileres


//Funcion que obtiene todos los alquileres
export async function obtenerAlquileres() {
  const [rows] = await conexionBD.query(`
    SELECT a.idAlquiler, a.idQuad, a.idCliente,
           DATE_FORMAT(a.fechaInicio, '%Y-%m-%d') AS fechaInicio,
           DATE_FORMAT(a.fechaFin,   '%Y-%m-%d') AS fechaFin,
           a.precioFinal,
           q.marca,
           c.nombre
    FROM alquileres a
    JOIN quads q ON a.idQuad = q.idQuad
    JOIN clientes c ON a.idCliente = c.idCliente
  `);
  return rows;
}

//Funcion que obtiene un alquiler
export async function obtenerAlquiler(id) {
  const [rows] = await conexionBD.query(
    `SELECT idAlquiler, idQuad, idCliente,
            DATE_FORMAT(fechaInicio, '%Y-%m-%d') AS fechaInicio,
            DATE_FORMAT(fechaFin,   '%Y-%m-%d') AS fechaFin,
            precioFinal
     FROM alquileres WHERE idAlquiler=?`,
    [id]
  );
  return rows[0];
}

//Funcion que crea un nuevo alquiler
export async function crearAlquiler(alquiler) {
  const [res] = await conexionBD.query(
      `INSERT INTO alquileres 
      (idQuad,idCliente,fechaInicio,fechaFin,precioFinal)
      VALUES (?,?,?,?,?)`,
      [alquiler.idQuad,alquiler.idCliente,alquiler.fechaInicio,alquiler.fechaFin,alquiler.precioFinal]
  );
  //Como estoy alquilando un quad, cambio el estado de este a alquilado
  await conexionBD.query(
      "UPDATE quads SET estado='Alquilado' WHERE idQuad=?",
      [alquiler.idQuad]
  );

  return res.insertId;
}



//Funcion que actualiza un Alquiler
export async function actualizarAlquiler(id, alquiler) {
  // Obtengo el alquiler actual para saber el quad que tenia antes
  const [rows] = await conexionBD.query(
    "SELECT idQuad FROM alquileres WHERE idAlquiler=?",
    [id]
  );
  const idQuadAnterior = rows[0]?.idQuad;

  await conexionBD.query(
    `UPDATE alquileres 
     SET idQuad=?, idCliente=?, fechaInicio=?, fechaFin=?, precioFinal=? 
     WHERE idAlquiler=?`,
    [alquiler.idQuad, alquiler.idCliente, alquiler.fechaInicio, alquiler.fechaFin, alquiler.precioFinal, id]
  );

  // Si cambiaron el quad pongo el anterior a Disponible y el nuevo a Alquilado
  if (idQuadAnterior && idQuadAnterior !== alquiler.idQuad) {
    await conexionBD.query(
      "UPDATE quads SET estado='Disponible' WHERE idQuad=?",
      [idQuadAnterior]
    );
    await conexionBD.query(
      "UPDATE quads SET estado='Alquilado' WHERE idQuad=?",
      [alquiler.idQuad]
    );
  }

  // Si las fechas cambian compruebo si el alquiler sigue activo
  const ahora   = new Date();
  const fechaFin = new Date(alquiler.fechaFin);
  const estado   = fechaFin >= ahora ? "Alquilado" : "Disponible";

  await conexionBD.query(
    "UPDATE quads SET estado=? WHERE idQuad=?",
    [estado, alquiler.idQuad]
  );
}

//Funcion que elimina un alquiler
export async function eliminarAlquiler(id, idQuad) {
  await conexionBD.query(
      "DELETE FROM alquileres WHERE idAlquiler=?",[id]   
      );
  //Como estoy eliminando un alquiler, cambio el estado del quad de este a Disponible
  await conexionBD.query(
      "UPDATE quads SET estado='Disponible' WHERE idQuad=?",[idQuad]
  );
}

//Funcion que desalquila un quad
export async function desalquilarQuad(idQuad) {
  await conexionBD.query(
    "UPDATE quads SET estado='Disponible' WHERE idQuad=?",
    [idQuad]
  );
}


//Categorias



//Funcion que obtiene todas las categorias
export async function obtenerCategorias() {
  const [rows] = await conexionBD.query("SELECT * FROM categorias");
  return rows;
}

//Funcion que crea una nueva categoria
export async function crearCategoria(nombre) {
  await conexionBD.query(
    "INSERT INTO categorias (nombre) VALUES (?)",
    [nombre]
  );
}

//Funcion que elimina una categoria
export async function eliminarCategoria(id) {
  await conexionBD.query(
    "DELETE FROM categorias WHERE idCategoria=?",
    [id]
  );
}

// Actualizo el nombre de una categoria
export async function actualizarCategoria(id, nombre) {
  await conexionBD.query(
    "UPDATE categorias SET nombre=? WHERE idCategoria=?",
    [nombre, id]
  );
}

//Funcion que se encarga de obtener ua cartegoria concreto
export async function obtenerCategoria(id) {
  const [rows] = await conexionBD.query("SELECT * FROM categorias WHERE idCategoria=?", [id]);
  return rows[0];
}