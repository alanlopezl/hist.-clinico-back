const express = require('express');
const app = express();

const controller = require('../controllers/preguntasController');
const {verifyToken} = require('../middlewares/VerifiyToken');

app.get('/preguntas',controller.Select);
app.get('/preguntasParam',controller.SelectParam);
app.post('/preguntas', controller.Insert);
app.post('/preguntasUser', controller.InsertPreguntaUsuario);
app.put('/preguntas', controller.Update);
app.delete('/preguntas/:id', controller.Delete);


module.exports = app