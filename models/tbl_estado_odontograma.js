const { DataTypes } = require('sequelize')

const { db } = require('../config/nonexion')


const EstadoOdontograma = db.define(`tbl_mo_estado_tratamiento`, {
    ID_ESTADO_TRATAMIENTO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    NOMBRE_ESTADO: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'tbl_mo_estado_tratamiento',
    timestamps: false,
})

//Para exportar el modelo
module.exports = EstadoOdontograma;