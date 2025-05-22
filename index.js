const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

require('./lib/mongo');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

const bookAPI = require('./rutas/books');
bookAPI(app);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
