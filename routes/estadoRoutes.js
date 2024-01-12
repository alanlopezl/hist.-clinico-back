const express = require('express');
const app = express();

const controller = require('../controllers/estadoController');
const {verifyToken} = require('../middlewares/VerifiyToken');

app.get('/estado',verifyToken, controller.Select);
app.post('/estado',verifyToken, controller.Insert);
app.put('/estado',verifyToken,controller.Update);
app.delete('/estado/:id',verifyToken, controller.Delete);


module.exports = app