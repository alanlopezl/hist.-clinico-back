const express = require('express');
const app = express();
const controller = require('../controllers/bitacoraController');
const { verifyToken } = require('../middlewares/VerifiyToken');

app.get('/bitacora',verifyToken, controller.Select);
app.post('/bitacora',verifyToken, controller.Insert);
app.delete('/bitacora',verifyToken, controller.Delete);

module.exports = app;