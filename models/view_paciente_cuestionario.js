const { DataTypes } = require('sequelize')

const { db } = require('../config/nonexion')


const ViewCuestionarioPaciente = db.define(`view_mo_cuestionario_paciente`, {
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
    },
    NOMBRE: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'view_mo_cuestionario_paciente',
    timestamps: false,
})

//Para exportar el modelo
module.exports = ViewCuestionarioPaciente;