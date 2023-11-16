const express = require('express');
const app = express();

const controller = require('../controllers/rolesController');
const {verifyToken} = require('../middlewares/VerifiyToken');

//CRUD 
app.get('/roles',verifyToken, controller.Select);  //MOSTRAR
app.post('/roles',verifyToken, controller.Insert); //CREAR
app.put('/roles',verifyToken, controller.Update);  //  ACCTUALIZAR
app.delete('/roles/:id',verifyToken, controller.Delete); //ELIMIAR



module.exports = app;