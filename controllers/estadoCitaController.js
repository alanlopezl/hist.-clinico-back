const { response, request } = require('express')
const db = require('../config/config');


const Select = (req = request, res=response) => {
    let { busqueda } = req.query;
    let consulta = `SELECT * FROM tbl_estado_cita where UPPER(NOMBRE) LIKE '%${busqueda.toUpperCase()}%'`;
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
     
    let verificacion = "select * from tbl_estado_cita where NOMBRE = ?";
    let consulta = `insert into tbl_estado_cita(NOMBRE) values (upper(?))`;

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

    let verificacion = "select * from tbl_estado_cita where NOMBRE = ?";
    let consulta = 'UPDATE tbl_estado_cita SET NOMBRE=? WHERE ID_ESTADO_CITA = ?';

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

    let consulta = 'DELETE FROM tbl_estado_cita WHERE ID_ESTADO_CITA=?';
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
