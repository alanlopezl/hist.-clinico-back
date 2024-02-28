const { response, request } = require("express");
const db = require("../config/config");
let bcrypt = require('bcryptjs');
const generator = require('generate-password');
const nodemailer = require("nodemailer");

const Select = (req = request, res = response) => {
  let {busqueda} = req.query;
  let consulta = `SELECT u.*,CONCAT(p.PRIMER_NOMBRE,' ',p.SEGUNDO_NOMBRE,' ',p.PRIMER_APELLIDO,' ',p.SEGUNDO_APELLIDO) AS PERSONA,r.NOMBRE_ROL
    FROM tbl_ms_usuario u INNER JOIN tbl_persona p ON u.COD_PERSONA = p.COD_PERSONA
    inner join tbl_ms_rol r on u.ID_ROL = r.ID_ROL where (UPPER(u.USUARIO) like '%${busqueda}%' or UPPER(u.EMAIL) like '%${busqueda}%' or UPPER(CONCAT(p.PRIMER_NOMBRE,' ',p.SEGUNDO_NOMBRE,' ',p.PRIMER_APELLIDO,' ',p.SEGUNDO_APELLIDO)) like '%${busqueda}%' or UPPER(r.NOMBRE_ROL) like '%${busqueda}%') and p.ID_TIPO_PERSONA = 1 order by u.id_usuario desc`;

  db.query(consulta, (error, results) => {
    if (error) {
      return res.json({
        ok: false,
        msg: error,
      });
    }
    return res.json({
      ok: true,
      data: results,
    });
  });
};


const SelectCount = (req = request, res = response) => {
  let consulta = `SELECT COUNT(*) as num FROM tbl_ms_usuario`;
  db.query(consulta, (error, results) => {
    if (error) {
      return res.json({
        ok: false,
        msg: error,
      });
    }
    return res.json({
      ok: true,
      data: results,
    });
  });
};

const SelectUser = (req = request, res = response) => {
  let consulta = `select * from tbl_ms_usuario u inner join tbl_persona p on u.COD_PERSONA = p.COD_PERSONA inner join tbl_ms_rol tmr on u.ID_ROL = tmr.ID_ROL  where ID_USUARIO = ?`;
  db.query(consulta, [req.params.id], (error, results) => {
    if (error) {
      return res.json({
        ok: false,
        msg: error,
      });
    }
    
    return res.json({
      ok: true,
      data: results,
    });
  });
};

const Insert = async (req = require, res = response) => {

  let consulta = "call Insert_Usuario(?,?,?,?,?)";
  let verificacion = "select * from tbl_ms_usuario where USUARIO = ?";
  let data = req.body;


  
  await db.query(verificacion, [data.usuario], (error, results) => {


    if (results.length > 0) {
      return res.json({
        ok: false,
        msg: "Ya existe un usuario con ese nombre",
      });
    }

    console.log('hola')

    const password = generator.generate({
      length: 8,
      numbers: true,
      uppercase: true,
      symbols: true,
      exclude: '|[]*\\`&°~^><}{',
      strict: true,
    })

    db.query(
      consulta,
      [data.idpersona, data.rol, data.usuario.toUpperCase(), data.correo, password],
      (error, results) => {
        if (error) {
          return res.json({
            ok: false,
            data: error,
          });
        }

        
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "lomasdentalcenter@gmail.com", // generated ethereal user
            pass: "oqmsmkspaztvsmwt", // generated ethereal password
          },
        });

        transporter.sendMail({
          from: '"LomasDentalCenter', // sender address
          to: data.correo, // list of receivers
          subject: "Credenciales del sistema", // Subject line
          text: `
          ¡Hola ${data.usuario}!
            Te damos la bienvenida a Lomas Dental Center, nos sentimos orgullosos que seas nuestro colaborador,
            seas mas que bienvenido a este gran equipo.
            A partir de ahora podras ingresar a nuestro plataforma el usuario: y la contraseña temporal: 
            Nota: Se te solicitara cambio de contraseña la primera vez que inicies sesion.
            ¡Saludos del equipo de LomasDentalCenter!
            Este es un mensaje automático de LomasDentalCenter, si recibiste este correo por error por favor elimínalo.`, // plain text body
          html: `<b>Usuario:${data.usuario} ,</b>
               <b>Contraseña: Hola1234@
               </b>`,
        });

        return res.json({
          ok: true,
          data: results,
        });
      }
    );
  });
};

const UpdatePass = async (req = require, res = response) => {
  
  let verificacion = "select * from tbl_ms_usuario where PASSWORDD = ? and ID_USUARIO = ?";
  let consulta = `update tbl_ms_usuario set PASSWORDD = ? where ID_USUARIO = ? and PASSWORDD = ?`;
  let consultaHist = `INSERT INTO tbl_ms_his_contrasena(ID_USUARIO, PASSWORDD) VALUES(?,?)`;

  let data = req.body;
  console.log(data);

  db.query(verificacion,[data.newpass,data.id],(error,result)=>{
   

    
    if (result.length > 0) {
      return res.json({
        ok: false,
        data: "Ingrese otra contraseña",
      });
    }


   db.query(
    consulta,
    [data.newpass, data.id, data.pass],
    (error, results) => {
  
      if (error) {
        return res.json({
          ok: false,
          data: error,
        });
      }

      if (results.affectedRows > 0) {
        db.query(consultaHist, [data.id, data.pass], (error, result) => {
          return res.json({
            ok: true,
            data: "Contraseña cambiada correctamente",
          });
        });
      } else {
        return res.json({
          ok: false,
          data: "Contraseña incorrecta",
        });
      }
    }
  );
})
};

const Update = (req = request, res = response) => {
  let consulta = `UPDATE tbl_ms_usuario
    SET COD_PERSONA=?,
    ID_ROL=?,
     USUARIO=?,
    EMAIL=?,
    FECHA_MODIFICACION=?,
     ID_ESTADO=?
    WHERE ID_USUARIO=?`;

  let data = req.body;
  db.query(
    consulta,
    [
      data.idpersona,
      data.rol,
      data.usuario,
      data.correo,
      new Date(),
      data.estado,
      data.id,
    ],
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

const Delete = (req = request, res = response) => {

  let consulta = "DELETE FROM tbl_ms_usuario WHERE ID_USUARIO=?";
  let id = req.params.id;

  db.query(consulta, [id], (error, results) => {
    if (error) return res.json({ ok: false, data: error });

    return res.json({
      ok: true,
      data: results,
    });
  });
}

module.exports = {
  Select,
  Insert,
  Update,
  Delete,
  SelectUser,
  SelectCount,
  UpdatePass,
};
