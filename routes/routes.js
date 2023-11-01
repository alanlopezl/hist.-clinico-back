const express = require('express');
const app = express();

app.use(require('./objetosRoutes'));
app.use(require('./preguntasRoutes'));
app.use(require('./personaRoutes'));
app.use(require('./loginRoutes'));
app.use(require('./rolesRoutes'));
app.use(require('./bitacoraRoutes'));
app.use(require('./usuariosRoutes'));
app.use(require('./permisosRoutes'));
app.use(require('./parametrosRoutes'));
app.use(require('./recuperacionRoutes'));


module.exports = app;