const express = require('express');
const app = express();

const controller = require('../controllers/rolesController');
const {verifyToken} = require('../middlewares/VerifiyToken');

//CRUD 
app.get('/roles', controller.Select);  //MOSTRAR
app.post('/roles', controller.Insert); //CREAR
app.put('/roles', controller.Update);  //  ACCTUALIZAR
app.delete('/roles/:id', controller.Delete); //ELIMIAR



module.exports = app;