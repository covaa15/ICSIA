
import 'dotenv/config';
import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const audioPath = "./audio.mp3"; // Archivo de audio a transcribir

  if (!fs.existsSync(audioPath)) {
    console.error(`Error: No se encuentra el archivo de audio en ${audioPath}`);
    return;
  }

  // Uso del modelo Whisper-1 para transcripción de voz a texto
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audioPath), // Enviamos el archivo como un Stream
    model: "whisper-1",
  });

  // Imprimimos el texto extraído del audio
  console.log("Transcripción:", transcription.text);
}

main();
