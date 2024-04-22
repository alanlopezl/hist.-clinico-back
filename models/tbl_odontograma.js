const { DataTypes } = require('sequelize')

const { db } = require('../config/nonexion')


const Odontrograma = db.define(`odontogram`, {
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
    ID_ESTADO_ODONTOGRAMA: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'odontogram',
    timestamps: false,
})

//Para exportar el modelo
module.exports = Odontrograma;