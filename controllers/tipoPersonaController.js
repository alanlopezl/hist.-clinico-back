const { response, request } = require('express')
const db = require('../config/config');


const Select = (req = request, res=response) => {
    let { busqueda } = req.query;
    let consulta = `SELECT * FROM tbl_tipo_persona where UPPER(TIPO) LIKE '%${busqueda.toUpperCase()}%'`;
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
     
    let verificacion = "select * from tbl_tipo_persona where TIPO = ?";
    let consulta = `insert into tbl_tipo_persona(TIPO) values (upper(?))`;

    await db.query(verificacion, [data.tipo], (error, results)=>{


        if(results.length>0){
            return res.json({
                ok: false,
                msg:'Ya existe un tipo de persona con ese nombre'
            });
        }

         db.query(consulta, [data.tipo], (error, results)=>{

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

    let verificacion = "select * from tbl_tipo_persona where TIPO = ?";
    let consulta = 'UPDATE tbl_tipo_persona SET TIPO=? WHERE ID_TIPO_PERSONA = ?';

    let data = req.body;
    await db.query(verificacion, [data.tipo], (error, results)=>{

        if(results.length>0){
            return res.json({
                ok: false,
                msg:'Ya existe un tipo persona con ese nombre'
            });
        }

        db.query(consulta, [data.tipo,data.id], (error,results)=>{

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

    let consulta = 'DELETE FROM tbl_tipo_persona WHERE ID_TIPO_PERSONA=?';
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
