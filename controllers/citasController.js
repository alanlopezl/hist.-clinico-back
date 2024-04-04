const { response, request } = require('express')
const db = require('../config/config');
const Persona = require('../models/tbl_persona');
const { crearTransporteSMTP } = require('../helpers/nodemailer_config');
const { opcionesHBS } = require('../templates/correoOptionsHBS');
const hbs = require('nodemailer-express-handlebars');
// Importar librerias de fechas
const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');

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

    console.log('FUCK');
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

const SelectAll = (req = request, res=response) => {

    let { busqueda } = req.query;

    console.log('FUCK');
     let consulta = `select tp.*, tc.*, tm.PRIMER_NOMBRE AS MEDICO_NOMBRE, tm.PRIMER_APELLIDO AS MEDICO_APELLIDO from tbl_citas tc inner join tbl_persona tp on tc.ID_PACIENTE = tp.COD_PERSONA INNER JOIN tbl_persona tm ON tc.ID_MEDICO = tm.COD_PERSONA`;
        
     if (busqueda != ''){
       consulta = consulta + ` where UPPER(tp.PRIMER_NOMBRE) LIKE '%${busqueda.toUpperCase()}%' or UPPER(tp.PRIMER_NOMBRE) LIKE '' or UPPER(tm.PRIMER_NOMBRE) LIKE '%${busqueda.toUpperCase()}%'`
     }
     console.log(consulta)
     db.query(consulta,(error, results) => {

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

    

         db.query(consulta, [data.medico,data.paciente,data.estado,data.especialidad,data.motivo,data.fecha],async (error, results)=>{

            if (error) {
                return res.json({
                    ok: false,
                    data: error
                });
            }

            const paciente = await Persona.findByPk(data.paciente)
            // Para enviar correos
            const transporte = await crearTransporteSMTP();

            // Template del correo
            const handlebarOptions = opcionesHBS()
            transporte.use('compile', hbs(handlebarOptions))
            // formato local
            dayjs.extend(localizedFormat)
            // Al usuario
            transporte.sendMail({
                from: `"LomasDentalCenter " <lomasdentalcenter@gmail.com>`, // Datos de emisor
                to: paciente.EMAIL, // Receptor
                subject: "¡Cita asignada!", // Asunto
                template: 'email',
                context: {
                    titulo: '¡Cita asignada!',
                    contenido: `Su cita ha sido asignada para el día: <strong>${dayjs(data.fecha).format('D MMM, YYYY, h:mm A')}</strong>
                    <br><br>
                    Motivo: <strong>${data.motivo}</strong>
                    `
                }
            }, (err) => {
                if(err) { console.log( err ) };
            });
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
/*
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
}*/

const Delete= (req=request,res=response) =>{

    let consulta = "DELETE FROM tbl_citas WHERE ID_CITA=?";
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
    SelectAll,
    Select,
    Insert,
    Update,
    Delete,
    Selectidespe
}
