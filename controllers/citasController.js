const { response, request } = require('express')
const db = require('../config/config');
const Persona = require('../models/tbl_persona');
const { crearTransporteSMTP } = require('../helpers/nodemailer_config');
const { opcionesHBS } = require('../templates/correoOptionsHBS');
const hbs = require('nodemailer-express-handlebars');
// Importar librerias de fechas
const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const Usuarios = require('../models/tbl_usuarios');
const Citas = require('../models/tbl_citas');

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

const Selectid = async (req = request, res=response) => {
    console.log('holaaaa');
    let {busqueda} = req.query;
    let {idMedico} = req.params;
    let medico = await Usuarios.findByPk(idMedico);
    let consulta = `select * from tbl_citas tc inner join tbl_persona tp on tc.ID_PACIENTE = tp.COD_PERSONA INNER JOIN tbl_estado_cita tec ON tc.ID_ESTADO_CITA = tec.ID_ESTADO_CITA  where UPPER(MOTIVO) LIKE '%${busqueda.toUpperCase()}%' AND ID_MEDICO = ${medico.COD_PERSONA} ORDER BY FECHA_CITA DESC`;
    console.log(consulta) 
    db.query(consulta, (error, results) => {

        console.log(results)
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

        print(consulta)

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
     let consulta = `select tp.*, tc.*, tec.*, tm.PRIMER_NOMBRE AS MEDICO_NOMBRE, tm.PRIMER_APELLIDO AS MEDICO_APELLIDO from tbl_citas tc inner join tbl_persona tp on tc.ID_PACIENTE = tp.COD_PERSONA INNER JOIN tbl_persona tm ON tc.ID_MEDICO = tm.COD_PERSONA INNER JOIN tbl_estado_cita tec ON tc.ID_ESTADO_CITA = tec.ID_ESTADO_CITA ORDER BY tc.FECHA_CITA DESC`;
        
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

    let consulta = 'UPDATE tbl_citas SET MOTIVO=?, FECHA_CITA=?, ID_ESTADO_CITA = ? WHERE ID_CITA = ?';

    let data = req.body;
    db.query(consulta, [data.motivo,data.fecha,data.estado, data.id], (error,results)=>{

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

const updateStatusDate = async(req = request, res=response) => {

    let consulta = 'UPDATE tbl_citas SET ID_ESTADO_CITA = ? WHERE ID_CITA = ?';

    let {estado, id} = req.body;
    db.query(consulta, [estado, id], (error,results)=>{

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

const updateStatusDateByClient = async(req = request, res=response) => {

    let {id, fecha} = req;
    let {status} = req.body

    const cita = await Citas.findByPk(id);

    if(cita.ID_ESTADO_CITA == 2) {
        return res.json({
            ok: false,
            msg: 'Su cita ya fue confirmada'
        })
    }

    if(cita.ID_ESTADO_CITA == 3) {
        return res.json({
            ok: false,
            msg: 'Su cita ya fue rechazada'
        })
    }  
    
    if(cita.ID_ESTADO_CITA != 1) {
        return res.json({
            ok: false,
            msg: `Su cita no puede ser ${status == 2 ? 'confirmada' : 'rechazada'}`
        })
    }

    await cita.update({
        ID_ESTADO_CITA: status
    })

    return res.json({
        ok: true,
        msg: "",
        fecha
    })
   
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
    Selectidespe,
    Selectid,
    updateStatusDate,
    updateStatusDateByClient
}
