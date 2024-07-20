const { response, request } = require("express");
const db = require("../config/config");
const { desects } = require("../helpers/helpers");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


const Recupreguntas = async (req = require, res = response) => {
  let consulta = `call RecuConfigPreguntas(?,?,?)`;

  let data = req.body;

  await db.query(
    consulta,
    [data.pregunta, data.respuesta, data.usuario],
    (error, results) => {
      if (error) {

        return res.json({
          ok: false,
          data: error,
        });
      }
      return res.json({
        ok: true,
        data: results[0],
      });
    }
  );
};

const recuperacioncorreo = async (req = require, res = response) => {
  let consulta = `call RecuCorreoElectronico(?)`;

  let data = req.body;
console.log('holaaaaaaaaaaaaaaaaa');
  console.log(data);
  //regresaar el usuario
  await db.query(consulta, [data.correo], (error, results) => {
console.log('holaasdadasda');
    if (error) {
console.log(error);
      return res.json({
        ok: false,
        data: error,
      });
    }
    let { codigo } = desects(results);
console.log('prueba'+codigo);
    if (codigo === 1) {
console.log('hola');
        return res.json({
            ok: false,
            data: "No existe el usuario",
        });
    }

    let data = desects(results);


    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "lomasdentalcenter@gmail.com", // generated ethereal user
        pass: "fmnhjopyeitwrmfe", // generated ethereal password
      },
    });

    const payload = {
      id: data.USUARIO
    }
  
    const token = jwt.sign(payload, "correoReset1234.", { expiresIn: "10m" });

    transporter.sendMail({
      from: '"', // sender address
      to: data.EMAIL, // list of receivers
      subject: "Recuperacion contraseña", // Subject line
      text: "", // plain text body
      html: `<h4>!saludos!, Hemos recibido la solicitud para restablecer tu contraseña, si no has sido tu, omite este mensaje.</h4>
              <b>Usuario:${data.USUARIO}</b>
              <br>
              <a href="${process.env.DOMINIO_PAG}/contraseña/${token}">Recuperar contraseña</a><br><br>
              <span style="font-size: 12px;">El enlace expirará en 10 minutos.</span>
            </b>`,
    });

    return res.json({
      ok: true,
      data: results[0],
    });
  });
};

const revalidarTokenCorreo = async(req = request, res = response) => {

  const { id } = req;

  return res.json({
      ok: true,
      id_usuario: id,
  });

}

const Update = (req = request, res = response) => {
  let consulta =
    "UPDATE tbl_role SET NOMBRE_ROL=?, ULT_MODIFICACION=? WHERE ID_ROL = ?";

  let data = req.body;

  db.query(consulta, [data.rol, new Date(), data.id], (error, results) => {
    if (error) {
      return res.json({
        ok: false,
        data: error,
      });
    }

    return res.json({
      ok: true,
      data: results,
    });
  });
};

module.exports = {
  Recupreguntas,
  Update,
  recuperacioncorreo,
  revalidarTokenCorreo
};
