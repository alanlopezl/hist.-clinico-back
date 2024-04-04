const { DataTypes } = require('sequelize')

const { db } = require('../config/nonexion')


const Persona = db.define(`tbl_persona`, {
    COD_PERSONA: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ID_TIPO_PERSONA: {
        type: DataTypes.INTEGER
    },
    PRIMER_NOMBRE: {
        type: DataTypes.STRING
    },
    SEGUNDO_NOMBRE: {
        type: DataTypes.STRING
    },
    PRIMER_APELLIDO: {
        type: DataTypes.STRING
    },
    SEGUNDO_APELLIDO: {
        type: DataTypes.STRING
    },
    DNI: {
        type: DataTypes.STRING
    },
    FEC_NACIMIENTO: {
        type: DataTypes.STRING
    },
    TELEFONO: {
        type: DataTypes.STRING
    },
    SEXO: {
        type: DataTypes.STRING
    },
    DIRECCION: {
        type: DataTypes.STRING
    },
    CREADO_POR: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR: {
        type: DataTypes.INTEGER
    },
    EMAIL: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'tbl_persona',
    timestamps: false
})

//Para exportar el modelo
module.exports = Persona;