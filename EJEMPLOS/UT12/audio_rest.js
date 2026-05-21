
import 'dotenv/config';
import fs from "fs";
import axios from "axios"; // Usamos axios para facilitar el envío de formularios (Multipart)
import FormData from "form-data";

async function main() {
  const audioPath = "./audio.mp3";

  if (!fs.existsSync(audioPath)) {
    console.error(`Error: No se encuentra el archivo de audio en ${audioPath}`);
    return;
  }

  // Creamos un formulario para enviar el archivo binario y el modelo
  const form = new FormData();
  form.append("file", fs.createReadStream(audioPath));
  form.append("model", "whisper-1");

  try {
    // Petición POST al endpoint de audio
    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      form,
      {
        headers: {
          ...form.getHeaders(), // Incluimos las cabeceras necesarias para Multipart
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    console.log("Transcripción (REST):", response.data.text);
  } catch (error) {
    // Manejo de errores detallado con Axios
    console.error("Error al transcribir audio:", error.response ? error.response.data : error.message);
  }
}

main();
