const { DataTypes } = require('sequelize')

const { db } = require('../config/nonexion')


const BitacoraPaciente = db.define(`tbl_mo_bitacora_paciente`, {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_PACIENTE: {
        type: DataTypes.INTEGER,
    },
    FECHA: {
        type: DataTypes.DATE,
    },
    LADO: {
        type: DataTypes.STRING
    },
    NUMERO_DIENTE: {
        type: DataTypes.STRING,
    },
    OBSERVACION: {
        type: DataTypes.STRING
    },
    TRATAMIENTO: {
        type: DataTypes.STRING
    },
    ESTADO: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'tbl_mo_bitacora_paciente',
    timestamps: false,
})

//Para exportar el modelo
module.exports = BitacoraPaciente;