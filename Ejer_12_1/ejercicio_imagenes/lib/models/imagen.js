import mongoose from "mongoose";

// Esquema de la coleccion
const imagenSchema = new mongoose.Schema({
  // Nombre del archivo con el UUID asignado al subir
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  // Array con los elementos que la IA detectó en la imagen
  objetos: {
    type: [String],
    default: []
  },
  // Fecha en que se subió la imagen
  fechaSubida: {
    type: Date,
    default: Date.now
  }
});

// Exportamos el modelo, reutilizándolo si ya existe 
export const Imagen = mongoose.models.Imagen || mongoose.model("Imagen", imagenSchema);