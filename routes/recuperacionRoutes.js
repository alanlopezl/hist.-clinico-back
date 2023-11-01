const express = require('express');
const app = express();

const controller = require('../controllers/recuperacionController');
const {verifyToken} = require('../middlewares/VerifiyToken');

app.post('/recupreguntas', controller.Recupreguntas);
app.post('/recuperacioncorreo', controller.recuperacioncorreo);


module.exports = app;