const express = require('express');
const app = express();

const controller = require('../controllers/personaController');
const {verifyToken} = require('../middlewares/VerifiyToken');

app.get('/persona', verifyToken,controller.Select);
app.get('/personaMedico', verifyToken,controller.SelectMedico);
app.get('/personausuario', verifyToken,controller.SelectUsuario);
app.get('/personaid/:id',verifyToken, controller.SelectId);
app.post('/persona',verifyToken, controller.Insert);
app.post('/personauser',verifyToken, controller.InsertUserPersona);
app.post('/personaMedico',verifyToken, controller.InsertMedico);
app.put('/persona',verifyToken, controller.Update);
app.put('/personaperfil',verifyToken, controller.UpdatePerfil);
app.put('/personaMedico',verifyToken, controller.UpdateMedico);
app.delete('/persona/:id',verifyToken,controller.Delete)
app.get('/personaM/:id',verifyToken, controller.SelectM);


module.exports = app;