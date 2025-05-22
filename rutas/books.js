const express = require('express');
const BooksService = require("../servicios/booksService");

function bookAPI(app) {
    const router = express.Router();
    app.use('/api/libros', router);

    const service = new BooksService();

    router.get('/', async function (req, res, next) {
        try {
            const books = await service.getLibros();
            console.log('Libros con texto:', books);

            res.status(200).json({
                data: books,
                message: 'Books recuperadas con éxito'
            });
        } catch (err) {
            console.log(`Se produjo un error: ${err}`);
            res.status(500).json({
                message: 'Error recuperando los libros',
                error: err.message
            });
        }
    });

    router.get('/:id', async function (req, res, next) {
        try {
            const { id } = req.params;
            const libro = await service.getLibroPorId(id);

            if (!libro) {
                return res.status(404).json({
                    message: 'Libro no encontrado',
                });
            }

            res.status(200).json({
                data: libro,
                message: 'Libro recuperado con éxito'
            });
        } catch (err) {
            console.error(`Error al recuperar el libro: ${err}`);
            res.status(500).json({
                message: 'Error al recuperar el libro',
                error: err.message
            });
        }
    });

}

module.exports = bookAPI;
