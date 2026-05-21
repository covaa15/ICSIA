"use client";
 
// Esta funcion se encarga de mostrar un mensaje cuando se produce un error en la app para que no salga pantalla en blanco
export default function Error({ error }) {
  return (
    <main>
      <h1>Se ha producido un error</h1>
      <p>{error.message}</p>
    </main>
  );
}