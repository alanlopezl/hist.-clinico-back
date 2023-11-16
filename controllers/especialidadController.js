const { response, request } = require('express')
const db = require('../config/config');

const Select = (req = request, res=response) => {
    let {busqueda} = req.query;
    let consulta = `SELECT * FROM tbl_especialidad where UPPER(NOMBRE) LIKE '%${busqueda.toUpperCase()}%'`;
    
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

const Selectid = (req = request, res=response) => {
    let {id} = req.params;
    let consulta = `select te.* from tbl_especialidad_medico tem inner join tbl_especialidad te on tem.ID_ESPECIALIDAD = te.ID_ESPECIALIDAD where tem.COD_PERSONA = ?`;
    
     db.query(consulta,[id], (error, results) => {
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
    let verificacion = "select * from tbl_especialidad where NOMBRE = ?";
    let consulta = `insert into tbl_especialidad(NOMBRE,DESCRIPCION) values (upper(?),upper(?))`;

    await db.query(verificacion, [data.nombre], (error, results)=>{


        if(results.length>0){
            return res.json({
                ok: false,
                msg:'Ya existe una especialidad con ese nombre'
            });
        }

         db.query(consulta, [data.nombre,data.descripcion], (error, results)=>{

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

    let verificacion = "select * from tbl_especialidad where NOMBRE = ?";
    let consulta = 'UPDATE tbl_especialidad SET NOMBRE=upper(?), DESCRIPCION=upper(?) WHERE ID_ESPECIALIDAD = ?';

    let data = req.body;
    await db.query(verificacion, [data.nombre], (error, results)=>{
        if(results.length>0){
            return res.json({
                ok: false,
                msg:'Ya existe una especialidad con ese nombre'
            });
        }
        db.query(consulta, [data.nombre,data.descripcion,data.id], (error,results)=>{
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

    let consulta = 'DELETE FROM tbl_especialidad WHERE ID_ESPECIALIDAD=?';
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
    Delete,
    Selectid
}
