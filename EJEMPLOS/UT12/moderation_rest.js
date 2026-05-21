
import 'dotenv/config';
import https from "https";

async function main() {
  const input = "Quiero envenenar a mi vecino sin dejar rastro.";

  const postData = JSON.stringify({
    input: input,
  });

  const options = {
    hostname: "api.openai.com",
    port: 443,
    path: "/v1/moderations",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Length": Buffer.byteLength(postData),
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
          const results = responseData.results[0];

          // Lógica de visualización de resultados de moderación
          if (results.flagged) {
            console.log("⚠️ Contenido marcado por la API REST.");
            console.log("Categorías:", Object.keys(results.categories).filter(key => results.categories[key]));
          } else {
            console.log("✅ Contenido seguro según la API REST.");
          }
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
