import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { conectarMongo } from "../../../lib/db";
import { subirImagen, getUrlPublica } from "../../../lib/filebase";
import { detectarObjetos } from "../../../lib/groq";
import { Imagen } from "../../../lib/models/imagen";

// Recibo una imagen, la analizo con IA y la guardo
export async function POST(request) {
  try {
    // Leo el formulario con el archivo enviado
    const formData = await request.formData();
    const archivo = formData.get("imagen");

    // Compruebo que se ha enviado un archivo
    if (!archivo) {
      return NextResponse.json({ error: "No se ha enviado ninguna imagen" }, { status: 400 });
    }

    // Convierto el archivo a Buffer
    const arrayBuffer = await archivo.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimetype = archivo.type;

    // Genero un nombre único con UUID conservando la extensión original
    const extension = archivo.name.split(".").pop();
    const nombreArchivo = `${uuidv4()}.${extension}`;

    // Subo la imagen a Filebase
    await subirImagen(nombreArchivo, buffer, mimetype);

    // Analizo la imagen con Groq para detectar los objetos
    const objetos = await detectarObjetos(buffer, mimetype);

    // Conecto a MongoDB y guardo el documento
    await conectarMongo();
    const nuevaImagen = await Imagen.create({ nombre: nombreArchivo, objetos });

    // Devuelvo los datos con la URL firmada
    return NextResponse.json({
      ok: true,
      imagen: {
        id: nuevaImagen._id,
        nombre: nuevaImagen.nombre,
        objetos: nuevaImagen.objetos,
        url: await getUrlPublica(nombreArchivo),
        fechaSubida: nuevaImagen.fechaSubida
      }
    });

  } catch (error) {
    console.error("Error al subir la imagen:", error);
    return NextResponse.json({ error: "Error interno al procesar la imagen" }, { status: 500 });
  }
}
