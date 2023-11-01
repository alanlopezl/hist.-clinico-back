const express = require('express');
const app = express();

const controller = require('../controllers/personaController');
const {verifyToken} = require('../middlewares/VerifiyToken');

app.get('/persona', controller.Select);
app.get('/personausuario', controller.SelectUsuario);
app.get('/personaid/:id', controller.SelectId);
app.post('/persona', controller.Insert);
app.post('/personauser', controller.InsertUserPersona);
app.put('/persona', controller.Update);
app.put('/personaperfil', controller.UpdatePerfil);
app.delete('/persona/:id',controller.Delete)


module.exports = app;