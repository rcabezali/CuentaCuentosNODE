const fs = require('fs');
const path = require('path');
const Book = require('../models/Book');

class BooksService {
    constructor() {
        this.coleccion = 'libros';
    }


    async cargarTextos(libros) {
        for (let libro of libros) {
            try {
                const ruta = path.join(process.cwd(), 'utils', 'mocks', `${libro.nombre_archivo}.txt`);

                console.log(`Leyendo archivo: ${ruta}`);

                if (fs.existsSync(ruta)) {
                    const texto = await fs.promises.readFile(ruta, 'utf8');
                    libro.texto = texto;
                } else {
                    console.warn(`Archivo no encontrado: ${ruta}`);
                    libro.texto = '[Texto no disponible]';
                }
            } catch (err) {
                console.error(`Error leyendo el archivo para el libro ${libro.nombre_archivo}:`, err.message);
                libro.texto = '[Texto no disponible]';
            }
        }
        return libros;
    }


    async getLibros() {
        try {

            const libros = await Book.find();

            const librosConTexto = await this.cargarTextos(libros);

            return librosConTexto;
        } catch (error) {
            console.error('Error recuperando libros:', error);
            throw error;
        }

    }

    async getLibroPorId(id) {
        try {
            const libro = await Book.findById(id);

            if (!libro) {
                throw new Error('Libro no encontrado');
            }

            const librosConTexto = await this.cargarTextos([libro]);

            return librosConTexto[0];
        } catch (error) {
            console.error(`Error recuperando el libro con ID ${id}:`, error);
            throw error;
        }
    }


}

module.exports = BooksService;
