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
app.use(require('./estadoRoutes'));
app.use(require('./tipoPersonaRoutes'));
app.use(require('./pacientesRoutes'));
app.use(require('./especialidadRoutes'));
app.use(require('./estadoCitaRoutes'));
app.use(require('./citasRoutes'));
app.use(require('./reportesRoutes'));
app.use(require('./enfermedadRoutes'));
app.use(require('./cuestionarioRoutes'));








module.exports = app;