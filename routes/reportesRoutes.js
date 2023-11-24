const express = require('express');
const app = express();

const controller = require('../controllers/reportesController');
const {verifyToken} = require('../middlewares/VerifiyToken');

//CRUD 
app.get('/countM',verifyToken, controller.SelectMedicos);  //MOSTRAR
app.get('/countP',verifyToken, controller.SelectPaciente);
app.get('/countU',verifyToken, controller.SelectUsuarios);  




module.exports = app;