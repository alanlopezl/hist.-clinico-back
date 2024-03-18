const { DataTypes } = require('sequelize')

const { db } = require('../config/nonexion')


const ViewOdontrograma = db.define(`view_mo_odontograma`, {
    ID_ODONTOGRAMA: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_PERSONA: {
        type: DataTypes.INTEGER,
    },
    LADO_DIENTE: {
        type: DataTypes.STRING
    },
    INDICE_DIENTE: {
        type: DataTypes.STRING,
    },
    OBSERVACION: {
        type: DataTypes.STRING
    },
    FECHA: {
        type: DataTypes.DATE,
    },
    ID_TRATAMIENTO: {
        type: DataTypes.INTEGER
    },
    ID_ESTADO: {
        type: DataTypes.INTEGER
    },
    NOMBRE: {
        type: DataTypes.STRING,
    },
    COMPLETO: {
        type: DataTypes.BOOLEAN
    },
    COLOR: {
        type: DataTypes.STRING
    },
    nombre_tratamiento: {
        type: DataTypes.STRING
    },
    precio_tratamiento: {
        type: DataTypes.DECIMAL
    }
}, {
    tableName: 'view_mo_odontograma',
    timestamps: false,
})

//Para exportar el modelo
module.exports = ViewOdontrograma;