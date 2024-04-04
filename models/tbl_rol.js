const { DataTypes } = require('sequelize')

const { db } = require('../config/nonexion')


const Rol = db.define(`tbl_ms_rol`, {
    ID_ROL: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    NOMBRE_ROL: {
        type: DataTypes.STRING
    },
    CREADO_POR: {
        type: DataTypes.STRING
    },
    FECHA_CREACION: {
        type: DataTypes.DATE
    },
    MODIFICADO_POR: {
        type: DataTypes.STRING
    },
    FECHA_MODIFICACION: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'tbl_ms_rol',
    timestamps: false
})

//Para exportar el modelo
module.exports = Rol;