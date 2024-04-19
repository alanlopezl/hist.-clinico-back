const { DataTypes } = require('sequelize')

const { db } = require('../config/nonexion')


const Citas = db.define(`tbl_citas`, {
    ID_CITA: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_MEDICO: {
        type: DataTypes.INTEGER
    },
    ID_PACIENTE: {
        type: DataTypes.INTEGER
    },
    ID_ESTADO_CITA: {
        type: DataTypes.INTEGER
    },
    FECHA_CITA: {
        type: DataTypes.DATE
    },
    MOTIVO: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'tbl_citas',
    timestamps: false,
})

//Para exportar el modelo
module.exports = Citas;