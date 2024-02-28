const { DataTypes } = require('sequelize')

const { db } = require('../config/nonexion')


const ViewEnfermedadPaciente = db.define(`view_mo_enfermedad_paciente`, {
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
    NOMBRE: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'view_mo_enfermedad_paciente',
    timestamps: false,
})

//Para exportar el modelo
module.exports = ViewEnfermedadPaciente;