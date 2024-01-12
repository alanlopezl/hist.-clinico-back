const express = require('express');
const app = express();

const controller = require('../controllers/cuestionarioController');
const {verifyToken} = require('../middlewares/VerifiyToken');

//CRUD 
app.get('/cuest',verifyToken, controller.Select);  //MOSTRAR
app.post('/cuest',verifyToken, controller.Insert); //CREAR
app.put('/cuest',verifyToken, controller.Update);  //  ACCTUALIZAR
app.delete('/cuest/:id',verifyToken, controller.Delete); //ELIMIAR



module.exports = app;