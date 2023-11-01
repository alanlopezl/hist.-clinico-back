const express = require('express');
const app = express();

const controller = require('../controllers/parametrosController');
const {verifyToken} = require('../middlewares/VerifiyToken');

app.get('/parametros',verifyToken,controller.Select);
app.post('/parametros',verifyToken,controller.Insert);
app.put('/parametros',verifyToken,controller.Update);
app.delete('/parametros/:id', verifyToken,controller.Delete);

module.exports = app;