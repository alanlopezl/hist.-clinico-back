const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');
require('dotenv').config();

const {db} = require('./config/nonexion');
const { mailSender } = require('./jobs/mailSender');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let puerto = process.env.PUERTO;
app.use(cors());
app.use( '/', express.static('./public'));
app.use(require('./routes/routes'));

app.get( '*', ( req, res ) => {
    res.sendFile( path.resolve( __dirname, './public/index.html') )
})

const conectar = async () => {
    try {
        await db.authenticate();
        console.log('Conexión exitosa!');

      } catch (error) {
        console.error(error);
    }
}

conectar();

const mandarCorreoPacientes = () => {

    // Cada día 12 AM, crear backup de la base de datos
    cron.schedule('0 0 * * *', async () => {
        await mailSender()
            .catch(err => console.log(err));
    });

}

mandarCorreoPacientes();

// Correr server
app.listen(puerto, () => {
    console.log(`Corriendo en el puerto ${puerto}`)
}); 
