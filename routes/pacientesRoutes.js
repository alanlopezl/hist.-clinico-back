const express = require('express');
const app = express();

const controller = require('../controllers/pacientesController');
const {verifyToken} = require('../middlewares/VerifiyToken');

app.get('/pacientes',verifyToken, controller.Select);
app.get('/cuestionario',verifyToken, controller.SelectCuestio);
app.get('/getAnswers/:idPaciente',verifyToken, controller.getAnswers);
app.get('/enfermedad',verifyToken, controller.SelectEnfer);

app.delete('/pacientes/:id',verifyToken, controller.Delete);
app.put('/pacientes', verifyToken,controller.UpdatePaciente);

app.post('/cuestionario',verifyToken, controller.Insert);
app.post('/pacientes',verifyToken, controller.InsertMedico);



module.exports = app;