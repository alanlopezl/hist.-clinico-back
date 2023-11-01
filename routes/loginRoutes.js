const express = require('express');
const app = express();

const controller = require('../controllers/loginController');

app.post('/login',controller.Login);
app.post('/cambiopass',controller.UpdatePass);

module.exports = app;