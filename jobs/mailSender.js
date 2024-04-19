const hbs = require("nodemailer-express-handlebars");
const { crearTransporteSMTP } = require("../helpers/nodemailer_config");
const Citas = require("../models/tbl_citas");
const { opcionesHBS } = require("../templates/correoOptionsHBS");
const dayjs = require("dayjs");
const localizedFormat = require('dayjs/plugin/localizedFormat');
const Persona = require("../models/tbl_persona");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const mailSender = async () => {

    // Traer todas las citas pendientes
    const citas = await Citas.findAll({
        where: {
            ID_ESTADO_CITA : 1
        }
    })

    // Para enviar correos
    const transporte = await crearTransporteSMTP();

    // Template del correo
    const handlebarOptions = opcionesHBS()
    transporte.use('compile', hbs(handlebarOptions))
    // formato local
    dayjs.extend(localizedFormat)

    for await (let cita of citas) {
        let paciente = await Persona.findByPk(cita.ID_PACIENTE)
        // Al usuario
        const payload = {
            id: cita.ID_CITA,
            fecha: dayjs(cita.FECHA_CITA).format('D MMM, YYYY, h:mm A')
        };
    
        const token = jwt.sign(payload, 'clinicacliente1234.', { expiresIn: '24h' });

        let fecha1 = new Date(cita.FECHA_CITA); // Reemplaza esto con tu fecha de la base de datos
        if(fecha1) {
            let fecha2 = new Date(); // Esto generará la fecha actual
            let diferencia = fecha1.getTime() - fecha2.getTime();
            let dias = Math.floor(diferencia / (1000 * 3600 * 24)) + 1;
    
            console.log(dias)
            if((dias == 1 || dias == 2) && cita.ID_ESTADO_CITA == 1) {
                console.log('RECORDANDOOOOOO!!!!s')
                transporte.sendMail({
                    from: `"LomasDentalCenter " <lomasdentalcenter@gmail.com>`, // Datos de emisor
                    to: paciente.EMAIL, // Receptor
                    subject: "¡Recordatorio de cita asignada!", // Asunto
                    template: 'email',
                    context: {
                        titulo: '¡Recordatorio de cita asignada!',
                        contenido: `Buenas tardes, esperemos se encuentre bien, le recordamos que su cita esta pronto: <strong>${dayjs(cita.FECHA_CITA).format('D MMM, YYYY, h:mm A')}</strong>
                        <br><br>
                        Motivo: <strong>${cita.MOTIVO}</strong>
                        <br>
                        <a href="${process.env.DOMINIO_PAG}/confirmation/${token}">Confirmar cita</a>
                        <br>
                        <br>
                        <br>
                        <a href="${process.env.DOMINIO_PAG}/decline/${token}">Rechazar cita</a>
                        `
                    }
                }, (err) => {
                    if(err) { console.log( err ) };
                });
            }

            if(dias < 1 && (cita.ID_ESTADO_CITA != 5 && cita.ID_ESTADO_CITA != 4 && cita.ID_ESTADO_CITA != 3)) {
                await cita.update({
                    ID_ESTADO_CITA: 5
                })
            }
        }
        
        // console.log('nadaaaaaa')
    }

}

module.exports = {
    mailSender
}