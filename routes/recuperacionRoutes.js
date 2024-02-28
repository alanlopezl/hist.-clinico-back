const express = require('express');
const app = express();

const controller = require('../controllers/recuperacionController');
const {verifyToken, validarCorreoJWT} = require('../middlewares/VerifiyToken');

app.post('/recupreguntas', controller.Recupreguntas);
app.post('/recuperacioncorreo', controller.recuperacioncorreo);
app.get('/recuperacion-correo/:token', [
    validarCorreoJWT
], controller.revalidarTokenCorreo)

module.exports = app;