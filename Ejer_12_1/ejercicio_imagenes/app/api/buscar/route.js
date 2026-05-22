import { NextResponse } from "next/server";
import { conectarMongo } from "../../../lib/db";
import { getUrlPublica } from "../../../lib/filebase";
import { Imagen } from "../../../lib/models/imagen";
// Busco imágenes por contenido
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const terminosParam = searchParams.get("terminos");

    if (!terminosParam) {
      return NextResponse.json({ error: "Debes indicar al menos un término de búsqueda" }, { status: 400 });
    }

    // Separo los términos por coma y los limpio
    const terminos = terminosParam
      .split(",")
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);

    await conectarMongo();

   // Busco imágenes que contengan alguno de los términos
   const regex = terminos.map(t => new RegExp(t, "i"));
   const imagenes = await Imagen.find({
     objetos: { $in: regex }
   }).sort({ fechaSubida: -1 });

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

   return NextResponse.json({
     ok: true,
     terminos,
     total: imagenesConUrl.length,
     imagenes: imagenesConUrl
   });

 } catch (error) {
   console.error("Error en la búsqueda:", error);
   return NextResponse.json({ error: "Error al buscar las imágenes" }, { status: 500 });
 }
}