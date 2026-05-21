
import 'dotenv/config';
import OpenAI from "openai";
import fs from "fs"; // Módulo para interactuar con el sistema de archivos

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const imagePath = "./image.png"; // Ruta del archivo de imagen local

  if (!fs.existsSync(imagePath)) {
    console.error(`Error: No se encuentra la imagen en ${imagePath}`);
    return;
  }

  // Convertimos la imagen a Base64 para enviarla en el cuerpo del JSON
  const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

  const response = await openai.chat.completions.create({
    model: "gpt-4o", // Modelo con capacidades multimodales (Visión)
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "¿Qué ves en esta imagen?" },
          {
            type: "image_url",
            image_url: {
              // Formato de data URI para enviar el binario codificado
              url: `data:image/png;base64,${imageBase64}`,
            },
          },
        ],
      },
    ],
  });

  console.log(response.choices[0].message.content);
}

main();
