const { DataTypes } = require('sequelize')

const { db } = require('../config/nonexion')


const EnfermedadPaciente = db.define(`tbl_enfermedad_paciente`, {
    ID_ENF_PAC: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    COD_PERSONA: {
        type: DataTypes.INTEGER,
    },
    ID_ENFERMEDAD: {
        type: DataTypes.INTEGER
    },
    RESP: {
        type: DataTypes.INTEGER,
    },
    
}, {
    tableName: 'tbl_enfermedad_paciente',
    timestamps: false,
})

//Para exportar el modelo
module.exports = EnfermedadPaciente;