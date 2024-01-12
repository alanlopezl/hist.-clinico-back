const express = require('express');
const app = express();

const controller = require('../controllers/estadoCitaController');
const {verifyToken} = require('../middlewares/VerifiyToken');

app.get('/estadocita',verifyToken, controller.Select);
app.post('/estadocita',verifyToken, controller.Insert);
app.put('/estadocita',verifyToken,controller.Update);
app.delete('/estadocita/:id',verifyToken, controller.Delete);

module.exports = app