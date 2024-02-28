const { Sequelize } = require("sequelize");

const { ESQUEMA, MYSQL_HOST, SQL_USER, SQL_PASSWORD, SQL_PORT } = process.env

const db = new Sequelize(ESQUEMA, SQL_USER, SQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
    port: SQL_PORT
});

module.exports = {
    db
};