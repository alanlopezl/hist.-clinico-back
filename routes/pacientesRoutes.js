const express = require('express');
const app = express();

const controller = require('../controllers/pacientesController');
const {verifyToken} = require('../middlewares/VerifiyToken');

app.get('/pacientes',verifyToken, controller.Select);
app.get('/cuestionario',verifyToken, controller.SelectCuestio);
app.get('/enfermedad',verifyToken, controller.SelectEnfer);

app.post('/cuestionario',verifyToken, controller.Insert);
app.post('/pacientes',verifyToken, controller.InsertMedico);



module.exports = app;