// Configuro la conexion a MySQL 
import mysql from 'mysql2/promise';

//Creo el pool de conexiones para la BD
export const conexionBD = mysql.createPool({
  host: 'dbejerciciosia.cnc6ds24hpyr.us-east-1.rds.amazonaws.com',
  user: 'ejerciciosIA',
  password: '12345678',
  database: 'bdRecetas'
});
