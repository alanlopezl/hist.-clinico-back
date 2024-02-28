const express = require('express');
const app = express();
const { validarCampos } = require('../middlewares/validar');
const controller = require('../controllers/usuarioController');
const {verifyToken} = require('../middlewares/VerifiyToken');

app.get('/usuario',verifyToken,controller.Select);
app.post('/usuario',/*verifyToken,*/ controller.Insert);
app.put('/usuario', verifyToken,controller.Update);
app.delete('/usuario/:id',verifyToken, controller.Delete);
app.get('/userid/:id',verifyToken,controller.SelectUser);
app.get('/usuariocount',verifyToken,controller.SelectCount);
app.put('/usuariopassupdate',verifyToken,controller.UpdatePass);

module.exports = app
