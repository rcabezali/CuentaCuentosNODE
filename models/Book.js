const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    titulo: String,
    texto: String,
    portada: String,
    sinopsis: String,
    autor: String,
    descripcion_autor: String,
    foto_autor: String,
    dificultad: String,
    nombre_archivo: String
}, { collection: 'libros' });

module.exports = mongoose.model('Book', bookSchema);
