const { response, request } = require('express')
const db = require('../config/config');


const SelectUsuarios = (req = request, res=response) => {
    
    let consulta = `select count(*) as id from tbl_ms_usuario`;
     db.query(consulta, (error, results) => {

        if (error) {
            return res.json({
                ok: false,
                msg: error
            });
        }
        return res.json({
            ok: true,
            data: results
        });
    });
}

const SelectPaciente = (req = request, res=response) => {
    let consulta = `select count(*) as id from tbl_persona where ID_TIPO_PERSONA = 2`;
     db.query(consulta, (error, results) => {

        if (error) {
            return res.json({
                ok: false,
                msg: error
            });
        }
        return res.json({
            ok: true,
            data: results
        });
    });
}

const SelectMedicos = (req = request, res=response) => {
    let consulta = `select count(*) as id from tbl_persona where ID_TIPO_PERSONA = 1`;
     db.query(consulta, (error, results) => {

        if (error) {
            return res.json({
                ok: false,
                msg: error
            });
        }
        return res.json({
            ok: true,
            data: results
        });
    });
}






module.exports = {
    SelectUsuarios,
    SelectPaciente,
    SelectMedicos
}
