const { response, request } = require('express')
const db = require('../config/config');


const Select = (req = request, res=response) => {
    let { busqueda } = req.query;
    let consulta = `SELECT * FROM tbl_ms_estado_usuario where UPPER(ESTADO) LIKE '%${busqueda.toUpperCase()}%'`;
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

const Insert = async(req = require, res = response)=>{



    let data = req.body;
     
    let verificacion = "select * from tbl_ms_estado_usuario where ESTADO = ?";
    let consulta = `insert into tbl_ms_estado_usuario(ESTADO) values (upper(?))`;

    await db.query(verificacion, [data.estado], (error, results)=>{


        if(results.length>0){
            return res.json({
                ok: false,
                msg:'Ya existe un estado con ese nombre'
            });
        }

         db.query(consulta, [data.estado], (error, results)=>{

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
    });
}

const Update = async(req = request, res=response) => {

    let verificacion = "select * from tbl_ms_estado_usuario where ESTADO = ?";
    let consulta = 'UPDATE tbl_ms_estado_usuario SET ESTADO=? WHERE ID_ESTADO = ?';

    let data = req.body;
    await db.query(verificacion, [data.estado], (error, results)=>{

        if(results.length>0){
            return res.json({
                ok: false,
                msg:'Ya existe un estado con ese nombre'
            });
        }

        db.query(consulta, [data.estado,data.id], (error,results)=>{

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
    
      

    });

   
}
const Delete = (req=request,res=response) =>{

    let consulta = 'DELETE FROM tbl_ms_estado_usuario WHERE ID_ESTADO=?';
    let id = req.params.id;

    db.query(consulta, [id], (error, results) => {

        if (error) return res.json({ ok:false, data: error });

        return res.json({
            ok: true,
            data: results

        });
    });
}

module.exports = {

    Select,
    Insert,
    Update,
    Delete
}
