const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit : 100,
    waitForConnections : true,
    queueLimit :0,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'historial_clinico(7)',
    port: '3306',
    wait_timeout : 28800,
    connect_timeout :10
});


module.exports = db;
