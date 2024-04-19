const express = require('express');
const app = express();

const controller = require('../controllers/citasController');
const {verifyToken, validarClientMailJWT} = require('../middlewares/VerifiyToken');

//CRUD 
app.get('/cita',verifyToken, controller.Select);  //MOSTRAR
app.get('/cita/:id/:espe',verifyToken, controller.Selectidespe);  //MOSTRAR
app.get('/cita/medico/:idMedico/search/pls',verifyToken, controller.Selectid);  //MOSTRAR
app.get('/cita/all/citas/pacientes',verifyToken, controller.SelectAll);  //MOSTRAR ALL

app.post('/cita',verifyToken, controller.Insert); //CREAR
app.put('/cita',verifyToken, controller.Update);  //  ACCTUALIZAR
app.put('/cita/client/:token',validarClientMailJWT, controller.updateStatusDateByClient);  //  ACCTUALIZAR
app.put('/cita/status',verifyToken, controller.updateStatusDate);  //  ACCTUALIZAR
app.delete('/cita/:id',verifyToken, controller.Delete); //ELIMIAR
//app.delete('/cita/:id',verifyToken, controller.DeleteCita); //ELIMIAR

module.exports = app;