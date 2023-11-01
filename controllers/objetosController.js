const { response, request } = require('express')
const db = require('../config/config');

const Select = (req = request, res=response) => {
    let {busqueda} = req.query;
    let consulta = `SELECT * from tbl_ms_objeto where UPPER(OBJETO) like '%${busqueda}%'`;
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


const SelectObjeto = (req = request, res=response) => {
    
    let consulta = 'CALL SELECT_OBJETOS_PADRE()';
     db.query(consulta, (error, results) => {
        if (error) {
            return res.json({
                ok: false,
                msg: error
            });
        }
        return res.json({
            ok: true,
            data: results[0]
        });
    });
}


const Insert = async(req = require, res = response)=>{

    let consulta = 'INSERT INTO tbl_ms_objeto(OBJETO, ICONO, URL, ID_PADRE)VALUES(?,?,?,?)';

    let data = req.body;

    await db.query(consulta, [data.objeto,data.icono,data.url,,data.idpadre], (error, results)=>{

        if (error) {
            return res.json({
                ok: false,
                data: error
            });
        }
        return res.json({
            ok: true,
            data: results
        });

    });

}

const Update = (req = request, res=response) => {

    let consulta = 'CALL UPDATE_OBJETO(?,?,?,?,?)';

    let data = req.body;

    db.query(consulta, [data.id,data.objeto,data.url,data.icono,data.padre], (error,results)=>{

        if (error) {
            return res.json({
                ok: false,
                data: error
            });
        }

        return res.json({
            ok: true,
            data: results
        });

    });
}

const Delete = (req=request,res=response) =>{

    let consulta = 'call DELETE_OBJETO(?)';
    let id = req.params.id;

    db.query(consulta, [id], (error, results) => {

        if (error)  return res.json({ ok:false, data: error });

        return res.json({
            ok: true,
            data: results

        });
    });
}

module.exports = {

    Select,
    SelectObjeto,
     Insert,
    Update,
    Delete

}
