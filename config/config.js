const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit : 100,
    waitForConnections : true,
    queueLimit :0,
    host: 'localhost',
    user: 'root',
    password: 'Rogb450f.',
    database: 'historial_clinico',
    port: '3306',
    wait_timeout : 28800,
    connect_timeout :10
});

module.exports = db;
