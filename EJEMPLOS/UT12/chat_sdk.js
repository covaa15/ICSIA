
import 'dotenv/config'; // Carga las variables de entorno desde el archivo .env
import OpenAI from "openai";

// Inicialización del cliente de OpenAI con la clave de API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  // Llamada al endpoint de Chat Completions utilizando el SDK
  const completion = await openai.chat.completions.create({
    // Historial de mensajes: 'user' para el humano, 'assistant' para la IA, 'system' para instrucciones
    messages: [{
      role: 'user',
      content: '¿Puedes contarme un chiste corto y divertido?'
    }],
    model: 'gpt-4o-mini', // Modelo ligero y eficiente de OpenAI
  });

  // Mostramos por consola la respuesta generada por el modelo
  console.log(completion.choices[0].message.content);
}

main();
