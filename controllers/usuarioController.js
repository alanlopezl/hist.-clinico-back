const { response, request } = require("express");
const db = require("../config/config");
let bcrypt = require('bcryptjs');
const generator = require('generate-password');
const nodemailer = require("nodemailer");
const Usuarios = require("../models/tbl_usuarios");
const Parametro = require("../models/tbl_parametro");
const modificarDias = require("../helpers/fechas");

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


  
  await db.query(verificacion, [data.usuario], async (error, results) => {


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

    // Hashear la contraseña antes de almacenarla
    const salt = bcrypt.genSaltSync();
    let hashedPassword = bcrypt.hashSync(password, salt);

    db.query(
      consulta,
      [data.idpersona, data.rol, data.usuario.toUpperCase(), data.correo, hashedPassword],
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
          html: `
              <p>¡Hola ${data.usuario.toUpperCase()}!
              Te damos la bienvenida a Lomas Dental Center, nos sentimos orgullosos que seas nuestro colaborador,
              seas mas que bienvenido a este gran equipo.
              A partir de ahora podras ingresar a nuestro plataforma el usuario: y la contraseña temporal: 
              Nota: Se te solicitara cambio de contraseña la primera vez que inicies sesion.
              ¡Saludos del equipo de LomasDentalCenter!
              Este es un mensaje automático de LomasDentalCenter, si recibiste este correo por error por favor elimínalo.</p>
              <br>
              <b>Usuario:${data.usuario.toUpperCase()} ,</b>
               <b>Contraseña: ${password}
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
  let { idUsuario, contrasena, confirmacion, contrasenaActual } = req.body;

    try {
        console.log(req.body)
        console.log('id', idUsuario)
        // Validar que hagan match la confirmación de contraseña
        if( contrasena !== confirmacion ) {
            return res.status(401).json({
                ok: false,
                msg: `Contraseña no coincide`
            })
        }

        // Hashear pregunta
        const salt = bcrypt.genSaltSync();
        let contrasenaHashed = bcrypt.hashSync(contrasena, salt);

        // Validar usuario inactivo
        const estadoUsuario = await Usuarios.findOne({where: {ID_USUARIO: idUsuario}})
        
        const validarPass = await bcrypt.compareSync( contrasenaActual, estadoUsuario.PASSWORDD )
        if( !validarPass ) {
        
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña inválida'
            })

        }
        
        // Si el usuario esta bloqueado o reiniciado, se activara, si tiene otro estado, se mantiene su estado
        if(estadoUsuario.ID_ESTADO === 3 || estadoUsuario.ID_ESTADO === 4) {
          estadoUsuario.ID_ESTADO = 1
        }

        // Asignar contraseña encryptada y reiniciar intentos
        estadoUsuario.PASSWORDD = contrasenaHashed;
        estadoUsuario.INTENTOS = 0;

        // Traer días de vigencia de parametros
        const diasVigencias = await Parametro.findOne({
            where:{
                PARAMETRO: 'ADMIN_DIAS_VIGENCIA'
            }
        });

        // ------------------- Actualizar fecha de vencimiento ------------------
        // Calcular fecha de vencimiento
        const fechaActual = new Date();
        const fechaVencimiento = (modificarDias(fechaActual, parseInt(diasVigencias.VALOR,10)));

        estadoUsuario.FEC_VENCIMIENTO = fechaVencimiento;
        await estadoUsuario.save();

        res.json({
            ok: true,
            msg: 'La contraseña ha sido actualizada con éxito'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
  
//   let verificacion = "select * from tbl_ms_usuario where PASSWORDD = ? and ID_USUARIO = ?";
//   let consulta = `update tbl_ms_usuario set PASSWORDD = ? where ID_USUARIO = ? and PASSWORDD = ?`;
//   let consultaHist = `INSERT INTO tbl_ms_his_contrasena(ID_USUARIO, PASSWORDD) VALUES(?,?)`;

//   let data = req.body;
//   console.log(data);
//   console.log('mondongooooooooo')

//   // Hashear contraseña
//   const salt = bcrypt.genSaltSync();
//   let passwordCrypted = bcrypt.hashSync(data.newpass, salt);

//   db.query(verificacion,[passwordCrypted,data.id],(error,result)=>{
   

    
//     if (result.length > 0) {
//       return res.json({
//         ok: false,
//         data: "Ingrese otra contraseña",
//       });
//     }


//    db.query(
//     consulta,
//     [passwordCrypted, data.id, data.pass],
//     (error, results) => {
  
//       if (error) {
//         return res.json({
//           ok: false,
//           data: error,
//         });
//       }

//       if (results.affectedRows > 0) {
//         db.query(consultaHist, [data.id, data.pass], (error, result) => {
//           return res.json({
//             ok: true,
//             data: "Contraseña cambiada correctamente",
//           });
//         });
//       } else {
//         return res.json({
//           ok: false,
//           data: "Contraseña incorrecta",
//         });
//       }
//     }
//   );
// })
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
