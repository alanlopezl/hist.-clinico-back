const { DataTypes } = require('sequelize')

const { db } = require('../config/nonexion')


const CuestionarioPaciente = db.define(`tbl_persona_cuestionario`, {
    ID_PERS_CUEST: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    COD_PERSONA: {
        type: DataTypes.INTEGER,
    },
    ID_CUESTIONARIO: {
        type: DataTypes.INTEGER
    },
    RESP: {
        type: DataTypes.INTEGER,
    },
    FECHA: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'tbl_persona_cuestionario',
    timestamps: false,
})

//Para exportar el modelo
module.exports = CuestionarioPaciente;