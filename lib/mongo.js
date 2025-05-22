const mongoose = require('mongoose');

const URI = 'mongodb+srv://florenciagonzalezmatteucci:tso3z2ZK5PUJZvnA@cluster0.hqq9j.mongodb.net/libros?retryWrites=true&w=majority';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
    .catch((err) => console.error('Error de conexión a MongoDB Atlas:', err));

module.exports = mongoose;
