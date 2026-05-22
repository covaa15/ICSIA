"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [imagenes, setImagenes] = useState([]);
  const [terminos, setTerminos] = useState(["", "", ""]);
  const [resultados, setResultados] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [preview, setPreview] = useState(null);
  const inputRef = useRef();

  // Cargo las imágenes 
  useEffect(() => {
    cargarImagenes();
  }, []);

  async function cargarImagenes() {
    try {
      const res = await fetch("/api/imagenes");
      const data = await res.json();
      if (data.ok) setImagenes(data.imagenes);
    } catch {
      setMensaje("Error al cargar las imágenes");
    }
  }

  // Muestro la vista previa 
  function onArchivoSeleccionado(e) {
    const archivo = e.target.files[0];
    if (!archivo) return;
    setPreview(URL.createObjectURL(archivo));
    setMensaje("");
  }

  // Subo la imagen al servidor y refresco la galería
  async function subirImagen(e) {
    e.preventDefault();
    const archivo = inputRef.current?.files[0];
    if (!archivo) { setMensaje("Selecciona una imagen primero"); return; }

    setSubiendo(true);
    setMensaje("Analizando imagen con IA... ");

    try {
      const formData = new FormData();
      formData.append("imagen", archivo);

      const res = await fetch("/api/subir", { method: "POST", body: formData });
      const data = await res.json();

      if (data.ok) {
        setMensaje(`Imagen subida. Se detectaron: ${data.imagen.objetos.join(", ")}`);
        setPreview(null);
        inputRef.current.value = "";
        cargarImagenes();
      } else {
        setMensaje(`Error: ${data.error}`);
      }
    } catch {
      setMensaje("Error de conexión al subir la imagen");
    } finally {
      setSubiendo(false);
    }
  }

  function actualizarTermino(index, valor) {
    const nuevos = [...terminos];
    nuevos[index] = valor;
    setTerminos(nuevos);
  }

  async function buscar(e) {
    e.preventDefault();
    const terminosFiltrados = terminos.filter(t => t.trim().length > 0);
    if (terminosFiltrados.length === 0) { setResultados(null); return; }

    try {
      const res = await fetch(`/api/buscar?terminos=${encodeURIComponent(terminosFiltrados.join(","))}`);
      const data = await res.json();
      if (data.ok) setResultados(data.imagenes);
    } catch {
      setMensaje("Error al realizar la búsqueda");
    }
  }

  function limpiarBusqueda() {
    setResultados(null);
    setTerminos(["", "", ""]);
  }

  const galeriaActual = resultados !== null ? resultados : imagenes;

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.titulo}>Gestor de Imágenes</h1>
        <p className={styles.subtitulo}>Sube imágenes y búscalas por su contenido gracias a IA</p>
      </header>

      {/* Formulario para subir una nueva imagen */}
      <section className={styles.seccion}>
        <h2 className={styles.seccionTitulo}>Subir imagen</h2>
        <form onSubmit={subirImagen} className={styles.formulario}>
          <label className={styles.labelArchivo}>
            <input ref={inputRef} type="file" accept="image/*" onChange={onArchivoSeleccionado} className={styles.inputArchivo} />
            <span> Seleccionar imagen</span>
          </label>
          {preview && <img src={preview} alt="Vista previa" className={styles.preview} />}
          <button type="submit" disabled={subiendo} className={styles.boton}>
            {subiendo ? "Analizando..." : "Subir y analizar"}
          </button>
        </form>
        {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
      </section>

      {/* Buscador por hasta 3 términos simultáneos */}
      <section className={styles.seccion}>
        <h2 className={styles.seccionTitulo}>Buscar por contenido</h2>
        <form onSubmit={buscar} className={styles.formularioBusqueda}>
          {terminos.map((t, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Término ${i + 1}${i === 0 ? " (obligatorio)" : " (opcional)"}`}
              value={t}
              onChange={e => actualizarTermino(i, e.target.value)}
              className={styles.inputBusqueda}
            />
          ))}
          <div className={styles.botonesRow}>
            <button type="submit" className={styles.boton}>Buscar</button>
            {resultados !== null && (
              <button type="button" onClick={limpiarBusqueda} className={`${styles.boton} ${styles.botonSecundario}`}>
                Limpiar
              </button>
            )}
          </div>
        </form>
        {resultados !== null && (
          <p className={styles.infoResultados}>
            {resultados.length === 0 ? "No se encontraron imágenes con esos términos" : `Se encontraron ${resultados.length} imagen(es)`}
          </p>
        )}
      </section>

      {/* Galería de imágenes */}
      <section className={styles.seccion}>
        <h2 className={styles.seccionTitulo}>
          {resultados !== null ? "Resultados de búsqueda" : `Galería (${imagenes.length} imágenes)`}
        </h2>
        {galeriaActual.length === 0 ? (
          <p className={styles.vacio}>No hay imágenes que mostrar</p>
        ) : (
          <div className={styles.galeria}>
            {galeriaActual.map(img => (
              <article key={img.id} className={styles.tarjeta}>
                <img src={img.url} alt={img.nombre} className={styles.imagenTarjeta} loading="lazy" />
                <div className={styles.tarjetaInfo}>
                  <p className={styles.nombreArchivo}>{img.nombre}</p>
                  <div className={styles.etiquetas}>
                    {img.objetos.map((obj, i) => (
                      <span key={i} className={styles.etiqueta}>{obj}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}