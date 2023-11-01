const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit : 100,
    waitForConnections : true,
    queueLimit :0,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'historialclinico',
    wait_timeout : 28800,
    connect_timeout :10
});


module.exports = db;
