const express = require('express');
const app = express();

const controller = require('../controllers/especialidadController');
const {verifyToken} = require('../middlewares/VerifiyToken');

app.get('/especialidad',verifyToken, controller.Select);
app.get('/especialidad/:id',verifyToken, controller.Selectid);
app.post('/especialidad',verifyToken, controller.Insert);
app.post('/especialidadMedico',verifyToken, controller.InsertMedico);
app.put('/especialidad',verifyToken,controller.Update);
app.delete('/especialidad/:id',verifyToken, controller.Delete);
app.delete('/especialidad/medico/:id',verifyToken, controller.DeleteFromMedic);


module.exports = app