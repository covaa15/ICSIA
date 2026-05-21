import mongoose from 'mongoose';

const esquemaRuta = new mongoose.Schema({
    nombre: { type: String, required: true },
    kms: { type: Number, required: true },
    dificultad: { type: String, enum: ['Sencilla', 'Media', 'Dificil'], required: true },
    imagen: { type: String, required: true }
});


export default mongoose.models.Ruta || mongoose.model('Ruta', esquemaRuta, 'rutas');