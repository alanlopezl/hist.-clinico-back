const { DataTypes } = require('sequelize')

const { db } = require('../config/nonexion')


const EstadoDiente = db.define(`estado_diente`, {
    ID_ESTADO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    NOMBRE: {
        type: DataTypes.STRING,
    },
    COMPLETO: {
        type: DataTypes.BOOLEAN
    },
    COLOR: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'estado_diente',
    timestamps: false,
})

//Para exportar el modelo
module.exports = EstadoDiente;