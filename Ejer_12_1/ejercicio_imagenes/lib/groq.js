import Groq from "groq-sdk";

// Creamos el cliente de Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Analiza una imagen y devuelve un array con los objetos detectados
export async function detectarObjetos(buffer, mimetype) {
  // Covierto el buffer a base64 para envialo a Groq
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${mimetype};base64,${base64}`;

  // Llamo al modelo de vision de Groq para analizar la imagen
  const respuesta = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: dataUrl }
          },
          {
            type: "text",
            // Le pedimos que responda solo con los objetos separados por comas
            text: "Lista todos los objetos, personas, animales y elementos que ves en esta imagen. Responde SOLO con los nombres separados por comas, sin explicaciones ni frases. Ejemplo: perro, pelota, árbol, persona"
          }
        ]
      }
    ],
    max_tokens: 300
  });

  // Cojo el texto de la respuesta
  const texto = respuesta.choices[0]?.message?.content || "";

  // Separo por comas y limpiamos espacios en blanco
  const objetos = texto
    .split(",")
    .map(obj => obj.trim().toLowerCase())
    .filter(obj => obj.length > 0);

  return objetos;
}