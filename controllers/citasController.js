const { response, request } = require('express')
const db = require('../config/config');


const Select = (req = request, res=response) => {
    let {busqueda} = req.query;
    let consulta = `SELECT * FROM tbl_citas where UPPER(MOTIVO) LIKE '%${busqueda.toUpperCase()}%'`;
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
    let {busqueda} = req.query;
    let consulta = `SELECT * FROM tbl_citas where UPPER(MOTIVO) LIKE '%${busqueda.toUpperCase()}%'`;
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


const Selectidespe = (req = request, res=response) => {

    let { busqueda } = req.query;
    let { id,espe } = req.params;

    console.log(id,espe);
     let consulta = `select * from tbl_citas tc inner join tbl_persona tp on tc.ID_PACIENTE = tp.COD_PERSONA where tc.ID_MEDICO  = ? and tc.ID_ESPECIALIDAD = ?`;
        
     if (busqueda != ''){
       consulta = consulta + ` or UPPER(tp.PRIMER_NOMBRE) LIKE '%${busqueda.toUpperCase()}%'`
     }
   
     db.query(consulta, [id,espe],(error, results) => {

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
     
    let consulta = `INSERT INTO tbl_citas
    (ID_MEDICO, ID_PACIENTE, ID_ESTADO_CITA, ID_ESPECIALIDAD,MOTIVO, FECHA_CITA)
    VALUES(?,?,?,?,upper(?),?)`;

  

         db.query(consulta, [data.medico,data.paciente,data.estado,data.especialidad,data.motivo,data.fecha], (error, results)=>{

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

const Update = async(req = request, res=response) => {

    let verificacion = "select * from tbl_ms_rol where NOMBRE_ROL = ?";
    let consulta = 'UPDATE tbl_ms_rol SET NOMBRE_ROL=?, FECHA_MODIFICACION=? WHERE ID_ROL = ?';

    let data = req.body;
    await db.query(verificacion, [data.rol], (error, results)=>{

        if(results.length>0){
            return res.json({
                ok: false,
                msg:'Ya existe una cita con ese nombre'
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
    Delete,
    Selectidespe
}
