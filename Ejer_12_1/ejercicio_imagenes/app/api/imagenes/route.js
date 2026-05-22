import { NextResponse } from "next/server";
import { conectarMongo } from "../../../lib/db";
import { getUrlPublica } from "../../../lib/filebase";
import { Imagen } from "../../../lib/models/imagen";

// Devuelvo todas las imágenes guardadas en MongoDB
export async function GET() {
  try {
    await conectarMongo();

    // Obtengo todas las imágenes ordenadas por fecha
    const imagenes = await Imagen.find().sort({ fechaSubida: -1 });

    // Añado la URL firmada de Filebase a cada imagen
    const imagenesConUrl = await Promise.all(
      imagenes.map(async img => ({
        id: img._id,
        nombre: img.nombre,
        objetos: img.objetos,
        url: await getUrlPublica(img.nombre),
        fechaSubida: img.fechaSubida
      }))
    );

    return NextResponse.json({ ok: true, imagenes: imagenesConUrl });

  } catch (error) {
    console.error("Error al obtener las imágenes:", error);
    return NextResponse.json({ error: "Error al obtener las imágenes" }, { status: 500 });
  }
}