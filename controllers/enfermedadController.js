const { response, request } = require('express')
const db = require('../config/config');


const Select = (req = request, res=response) => {
    let {busqueda} = req.query;
    let consulta = `SELECT * FROM tbl_enfermedad where UPPER(NOMBRE) LIKE '%${busqueda.toUpperCase()}%'`;
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
     
    let verificacion = "select * from tbl_enfermedad where NOMBRE = ?";
    let consulta = `insert into tbl_enfermedad(NOMBRE) values (upper(?))`;

    await db.query(verificacion, [data.nombre], (error, results)=>{


        if(results.length>0){
            return res.json({
                ok: false,
                msg:'Ya existe un nombre'
            });
        }

         db.query(consulta, [data.nombre], (error, results)=>{

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

    let verificacion = "select * from tbl_enfermedad where NOMBRE = ?";
    let consulta = 'UPDATE tbl_enfermedad SET NOMBRE=? WHERE ID_ENFERMEDAD = ?';

    let data = req.body;
    await db.query(verificacion, [data.nombre], (error, results)=>{

        if(results.length>0){
            return res.json({
                ok: false,
                msg:'Ya existe un nombre'
            });
        }

        db.query(consulta, [data.nombre,data.id], (error,results)=>{

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

    let consulta = 'DELETE FROM tbl_enfermedad WHERE ID_ENFERMEDAD=?';
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
