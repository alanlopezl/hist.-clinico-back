const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const {db} = require('./config/nonexion');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let puerto = process.env.PUERTO;
app.use(cors());

app.use(require('./routes/routes'));

const conectar = async () => {
    try {
        await db.authenticate();
        console.log('Conexión exitosa!');

      } catch (error) {
        console.error(error);
    }
}

conectar();

// Correr server
app.listen(puerto, () => {
    console.log(`Corriendo en el puerto ${puerto}`)
}); 