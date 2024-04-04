const { DataTypes } = require('sequelize')

const { db } = require('../config/nonexion')


const Parametro = db.define(`tbl_ms_parametro`, {
    ID_PARAMETRO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    PARAMETRO: {
        type: DataTypes.STRING
    },
    VALOR: {
        type: DataTypes.STRING
    },
    ID_USUARIO: {
        type: DataTypes.INTEGER
    },
    FEC_CREACION: {
        type: DataTypes.DATE
    },
    FEC_MODIFICACION: {
        type: DataTypes.DATE
    },
    CREADO_POR: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'tbl_ms_parametro',
    timestamps: true,
    createdAt: 'FEC_CREACION',
    updatedAt: 'FEC_MODIFICACION'
})

//Para exportar el modelo
module.exports = Parametro;