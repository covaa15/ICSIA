
import 'dotenv/config'; // Carga las variables de entorno (.env)
import https from "https"; // Módulo nativo de Node.js para peticiones HTTPS

async function main() {
  // Cuerpo de la petición en formato JSON
  const postData = JSON.stringify({
    model: "gpt-4o-mini",
    messages: [{
      role: "user",
      content: "¿Puedes contarme un chiste corto y divertido?"
    }],
  });

  // Configuración de la cabecera y destino de la petición REST
  const options = {
    hostname: "api.openai.com",
    port: 443,
    path: "/v1/chat/completions",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // Autenticación mediante token
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  // Creación de una Promesa para manejar la asincronía de la petición nativa
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";

      // Recibimos los datos en trozos (chunks)
      res.on("data", (chunk) => {
        data += chunk;
      });

      // Al terminar la recepción, procesamos el JSON
      res.on("end", () => {
        const responseData = JSON.parse(data);
        // Validamos si la respuesta fue exitosa (código 2xx)
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(responseData.choices[0].message.content);
        } else {
          // Si hay error (p.ej. cuota excedida), mostramos el mensaje de la API
          console.error(`Error de la API (${res.statusCode}):`, responseData.error ? responseData.error.message : data);
        }
        resolve();
      });
    });

    req.on("error", (e) => {
      console.error("Error en la petición:", e);
      reject(e);
    });

    // Enviamos el cuerpo de la petición y cerramos
    req.write(postData);
    req.end();
  });
}

main();
