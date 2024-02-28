const { DataTypes } = require('sequelize')

const { db } = require('../config/nonexion')


const Usuarios = db.define(`tbl_ms_usuario`, {
    ID_USUARIO: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_PERSONA: {
        type: DataTypes.INTEGER,
    },
    USUARIO: {
        type: DataTypes.STRING
    },
    ESTADO: {
        type: DataTypes.STRING,
        default: true
    },
    CONTRASEÑA: {
        type: DataTypes.STRING
    },
    ID_ROL: {
        type: DataTypes.INTEGER
    },
    PRIMER_VEZ: {
        type: DataTypes.INTEGER
    },
    FEC_VENCIMIENTO: {
        type: DataTypes.DATE
    },
    EMAIL: {
        type: DataTypes.STRING
    },
    INTENTOS: {
        type: DataTypes.INTEGER
    },
    AUTOREGISTRO: {
        type: DataTypes.BOOLEAN
    },
    CREADO_POR: {
        type: DataTypes.INTEGER
    },
    MODIFICADO_POR: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'tbl_ms_usuario',
    timestamps: true,
    createdAt: 'FECHA_CREACION',
    updatedAt: 'FECHA_MODIFICACION'
})

//Para exportar el modelo
module.exports = Usuarios;