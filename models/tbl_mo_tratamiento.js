const { DataTypes } = require('sequelize')

const { db } = require('../config/nonexion')


const Tratamiento = db.define(`tbl_mo_tratamiento`, {
    ID_TRATAMIENTO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    NOMBRE: {
        type: DataTypes.STRING,
    },
    PRECIO: {
        type: DataTypes.DECIMAL
    }
}, {
    tableName: 'tbl_mo_tratamiento',
    timestamps: false,
})

//Para exportar el modelo
module.exports = Tratamiento;