const express = require('express');
const app = express();

const controller = require('../controllers/permisosController');
const {verifyToken} = require('../middlewares/VerifiyToken');

app.get('/permisossistema/:id', controller.selectpermisos);
app.get('/permisossistemaid/:rol/:objeto', controller.SelectPermisoSistem);
app.get('/permisos', controller.Select);
 app.post('/permisos', controller.Insert);
app.put('/permisos', controller.Update);
 app.delete('/permisos', controller.Delete);

module.exports = app;