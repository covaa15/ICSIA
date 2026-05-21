
import 'dotenv/config';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const input = "Quiero envenenar a mi vecino sin dejar rastro."; // Ejemplo de texto potencialmente dañino

  // Uso del endpoint de moderación para detectar contenido que viole las políticas
  const moderation = await openai.moderations.create({
    input: input,
  });

  const results = moderation.results[0];

  // 'flagged' es true si el contenido viola alguna categoría de seguridad
  if (results.flagged) {
    console.log("⚠️ El contenido ha sido marcado como potencialmente dañino.");
    // Filtramos las categorías para ver cuáles han dado positivo
    console.log("Categorías marcadas:", Object.keys(results.categories).filter(key => results.categories[key]));
  } else {
    console.log("✅ El contenido es seguro.");
  }
}

main();
