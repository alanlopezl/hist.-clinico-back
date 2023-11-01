const { response, request } = require('express')
const db = require('../config/config');


const Select = (req = request, res=response) => {
    let {busqueda} = req.query;
    let consulta = `SELECT * FROM tbl_ms_rol where UPPER(NOMBRE_ROL) LIKE '%${busqueda.toUpperCase()}%'`;
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
     
    let verificacion = "select * from tbl_ms_rol where NOMBRE_ROL = ?";
    let consulta = `insert into tbl_ms_rol(NOMBRE_ROL,FECHA_CREACION) values (upper(?),?)`;

    await db.query(verificacion, [data.rol], (error, results)=>{


        if(results.length>0){
            return res.json({
                ok: false,
                msg:'Ya existe un rol con ese nombre'
            });
        }

         db.query(consulta, [data.rol,new Date()], (error, results)=>{

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

    let verificacion = "select * from tbl_ms_rol where NOMBRE_ROL = ?";
    let consulta = 'UPDATE tbl_ms_rol SET NOMBRE_ROL=?, FECHA_MODIFICACION=? WHERE ID_ROL = ?';

    let data = req.body;
    await db.query(verificacion, [data.rol], (error, results)=>{

        if(results.length>0){
            return res.json({
                ok: false,
                msg:'Ya existe un rol con ese nombre'
            });
        }

        db.query(consulta, [data.rol,new Date(),data.id], (error,results)=>{

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

    let consulta = 'DELETE FROM tbl_ms_rol WHERE ID_ROL=?';
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
