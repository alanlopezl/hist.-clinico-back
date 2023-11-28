const express = require('express');
const app = express();

const controller = require('../controllers/enfermedadController');
const {verifyToken} = require('../middlewares/VerifiyToken');

//CRUD 
app.get('/enfer',verifyToken, controller.Select);  //MOSTRAR
app.post('/enfer',verifyToken, controller.Insert); //CREAR
app.put('/enfer',verifyToken, controller.Update);  //  ACCTUALIZAR
app.delete('/enfer/:id',verifyToken, controller.Delete); //ELIMIAR



module.exports = app;