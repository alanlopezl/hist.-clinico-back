const express = require('express');
const app = express();

const controller = require('../controllers/objetosController');
const {verifyToken} = require('../middlewares/VerifiyToken');

app.get('/objetos',verifyToken, controller.Select);
app.get('/objetospadre',verifyToken, controller.SelectObjeto);
app.post('/objetos',verifyToken, controller.Insert);
app.put('/objetos',verifyToken,controller.Update);
app.delete('/objetos/:id',verifyToken, controller.Delete);


module.exports = app