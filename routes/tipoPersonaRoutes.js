const express = require('express');
const app = express();

const controller = require('../controllers/tipoPersonaController');
const {verifyToken} = require('../middlewares/VerifiyToken');

app.get('/tipo-persona',verifyToken, controller.Select);
app.post('/tipo-persona',verifyToken, controller.Insert);
app.put('/tipo-persona',verifyToken,controller.Update);
app.delete('/tipo-persona/:id',verifyToken, controller.Delete);


module.exports = app