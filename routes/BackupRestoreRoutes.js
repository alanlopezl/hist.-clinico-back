const { request } = require("express");
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');

// Configuración de CORS
app.use(cors());

const b = require('../controllers/backupRestoreController');
const { validarBackup } = require("../middlewares/validar-backup");

app.get('/bacselect', b.Select);
app.get('/restore', b.restore);
app.post('/backup', b.backup);
app.post('/backup/db-backup/subir', b.postBackup);


app.put('/backup/db-backup/actualizar', [validarBackup], b.putBackup);

module.exports = app;