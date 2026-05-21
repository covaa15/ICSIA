
import 'dotenv/config'; // Carga de variables de entorno
import https from "https";
import fs from "fs";

async function main() {
  const imagePath = "./image.png";

  if (!fs.existsSync(imagePath)) {
    console.error(`Error: No se encuentra la imagen en ${imagePath}`);
    return;
  }

  // Lectura del archivo y conversión a Base64 para envío en JSON
  const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

  // Estructura del cuerpo para modelos multimodales (GPT-4o)
  const postData = JSON.stringify({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "¿Qué ves en esta imagen?" },
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${imageBase64}`,
            },
          },
        ],
      },
    ],
  });

  const options = {
    hostname: "api.openai.com",
    port: 443,
    path: "/v1/chat/completions",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Length": Buffer.byteLength(postData), // Obligatorio al enviar cuerpos JSON grandes
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const responseData = JSON.parse(data);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log("Análisis de imagen (REST):", responseData.choices[0].message.content);
        } else {
          console.error(`Error de la API (${res.statusCode}):`, responseData.error ? responseData.error.message : data);
        }
        resolve();
      });
    });

    req.on("error", (e) => {
      console.error(e);
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

main();
