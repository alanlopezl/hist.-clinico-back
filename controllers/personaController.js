const { response, request } = require("express");
const db = require("../config/config");
const bcrypt = require("bcryptjs");
const Persona = require("../models/tbl_persona");
const Rol = require("../models/tbl_rol");
const modificarDias = require("../helpers/fechas");
const Usuarios = require("../models/tbl_usuarios");
const { UniqueConstraintError } = require("sequelize");
const Parametro = require("../models/tbl_parametro");
const nodemailer = require("nodemailer");

const Select = async (req = request, res = response) => {
  let { busqueda } = req.query;
  let consulta = `SELECT * FROM tbl_persona where UPPER(PRIMER_NOMBRE) like '%${busqueda}%' or UPPER(DNI) like '%${busqueda}%' or UPPER(SEXO) like '%${busqueda}%' order by COD_PERSONA DESC`;
  console.log("pruebaaaa");
  await db.query(consulta, (error, results) => {
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

const SelectMedico = async (req = request, res = response) => {
  let { busqueda } = req.query;
  let consulta = `SELECT * FROM tbl_persona where ID_TIPO_PERSONA = 1 order by COD_PERSONA DESC`;
  console.log("pruebaaaa");

  await db.query(consulta, (error, results) => {
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

// Cargar lista de personas en la pantalla de usuarios
const SelectUsuario = async (req = request, res = response) => {
  let consulta =
    "SELECT * FROM tbl_persona WHERE COD_PERSONA NOT IN (SELECT COD_PERSONA FROM tbl_ms_usuario) and ID_TIPO_PERSONA = 1";

  await db.query(consulta, (error, results) => {
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

const SelectId = (req = request, res = response) => {
  let id = req.params.id;

  let consulta = "SELECT * FROM tbl_persona where COD_PERSONA = ?";
  db.query(consulta, [id], (error, results) => {
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

const InsertMedico = async (req = require, res = response) => {
  let data = req.body;

  let verificacion = "select * from tbl_persona where DNI = ?";
  let consulta = `INSERT INTO tbl_persona (ID_TIPO_PERSONA,PRIMER_NOMBRE, SEGUNDO_NOMBRE, PRIMER_APELLIDO, SEGUNDO_APELLIDO, DNI, FEC_NACIMIENTO, SEXO)
  VALUES(?,upper(?),upper(?),upper(?),upper(?),?,?,?)`;

  await db.query(verificacion, [data.dni], (error, results) => {
    if (results.length > 0) {
      return res.json({
        ok: false,
        msg: "Ya existe una persona con el DNI " + data.dni,
      });
    }

    // VALIDAR DNI Y TÉLEFONO FOCK
    if (data.dni.includes("0000000000000")) {
      return res.json({
        msg: true,
        ok: false,
        msg: `No se permiten solo 0 en DNI.`,
      });
    }
    db.query(
      consulta,
      [
        data.tipo,
        data.primern,
        data.segudon,
        data.primera,
        data.segundoa,
        data.dni,
        data.nacimiento,
        data.sexo,
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
  });
};

const Insert = async (req = require, res = response) => {
  let data = req.body;

  let verificacion = "select * from tbl_persona where DNI = ?";
  let consulta = `INSERT INTO tbl_persona (PRIMER_NOMBRE, SEGUNDO_NOMBRE, PRIMER_APELLIDO, SEGUNDO_APELLIDO, DNI, FEC_NACIMIENTO, SEXO)
  VALUES(upper(?),upper(?),upper(?),upper(?),?,?,?)`;

  await db.query(verificacion, [data.dni], (error, results) => {
    if (results.length > 0) {
      return res.json({
        ok: false,
        msg: "Ya existe una persona con el DNI " + data.dni,
      });
    }
    db.query(
      consulta,
      [
        data.primern,
        data.segudon,
        data.primera,
        data.segundoa,
        data.dni,
        data.nacimiento,
        data.sexo,
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
  });
};

const InsertUserPersona = async (req = require, res = response) => {
  let data = req.body;

  try {
    // VALIDAR DNI Y TÉLEFONO FOCK
    if (data.DNI.includes("0000000000000")) {
      return res.status(400).json({
        ok: false,
        mensaje: `No se permiten solo 0 en DNI.`,
      });
    }

    if (data.TELEFONO.includes("00000000")) {
      return res.status(400).json({
        ok: false,
        mensaje: `No se permiten solo 0 en el número de télefono.`,
      });
    }

    // Verificar usuario y correo
    let usuarioUser = await Usuarios.findOne({
      where: {
        USUARIO: data.USUARIO,
      },
    });

    let usuarioEmail = await Usuarios.findOne({
      where: {
        EMAIL: data.EMAIL,
      },
    });

    if (usuarioUser) {
      return res.status(400).json({
        ok: false,
        mensaje: `Usuario ya está en uso`,
      });
    }

    if (usuarioEmail) {
      return res.status(400).json({
        ok: false,
        mensaje: `Correo ya está en uso`,
      });
    }

    // Días de caducidad
    const diasVigencia = await Parametro.findOne({
      where: {
        PARAMETRO: "ADMIN_DIAS_VIGENCIA",
      },
    });

    // Calcular fecha de vencimiento
    const fechaActual = new Date();
    const fechaVencimiento = modificarDias(
      fechaActual,
      parseInt(diasVigencia.VALOR, 10)
    );

    // Traer el rol por default
    const id_rol = await Rol.findOne({
      where: {
        NOMBRE_ROL: "DEFAULT",
      },
    });

    // Crear persona
    let persona = await Persona.create({
      PRIMER_NOMBRE: data.PRIMER_NOMBRE.toUpperCase(),
      SEGUNDO_NOMBRE: data.SEGUNDO_NOMBRE.toUpperCase(),
      PRIMER_APELLIDO: data.PRIMER_APELLIDO.toUpperCase(),
      SEGUNDO_APELLIDO: data.SEGUNDO_APELLIDO.toUpperCase(),
      DNI: data.DNI,
      FEC_NACIMIENTO: data.FEC_NACIMIENTO,
      SEXO: data.SEXO,
      TELEFONO: data.TELEFONO,
      DIRECCION: data.DIRECCION.toUpperCase(),
      ID_TIPO_PERSONA: 1
    });

    const id = persona.COD_PERSONA;
    console.log("ID del registro creado:", id);

    // Crear usuario con el modelo
    const usuario = Usuarios.build({
      USUARIO: data.USUARIO.toUpperCase(),
      PASSWORDD: data.CONTRASEÑA,
      EMAIL: data.EMAIL,
      FEC_VENCIMIENTO: fechaVencimiento,
      ID_ROL: id_rol.ID_ROL,
      COD_PERSONA: id,
      CREADO_POR: data.USUARIO.toUpperCase(),
      MODIFICADO_POR: data.USUARIO.toUpperCase(),
      ID_ESTADO: 4
    });

    // Hashear contraseña
    const salt = bcrypt.genSaltSync();
    usuario.PASSWORDD = bcrypt.hashSync(data.CONTRASEÑA, salt);

    // Crear usuario de DB
    await usuario.save();

    const usuarioNuevo = await Usuarios.findOne({
      where: { USUARIO: usuario.USUARIO },
    });

    // await HistContra.create({
    //   ID_USUARIO: usuarioNuevo.ID_USUARIO,
    //   CONTRASENA: usuario.CONTRASEÑA,
    // });

    // Mandar correo
    // Para enviar correos
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "lomasdentalcenter@gmail.com", // generated ethereal user
        pass: "fmnhjopyeitwrmfe", // generated ethereal password
      },
    });

    transporter.sendMail({
      from: '"LomasDentalCenter', // sender address
      to: usuario.EMAIL, // list of receivers
      subject: "Credenciales del sistema", // Subject line
      html: `
          <p>¡Hola ${usuario.USUARIO.toUpperCase()}!
          Te damos la bienvenida a Lomas Dental Center, nos sentimos orgullosos que seas nuestro colaborador,
          seas mas que bienvenido a este gran equipo.
          A partir de ahora podras ingresar a nuestro plataforma el usuario: y la contraseña temporal: 
          Nota: Se te solicitara cambio de contraseña la primera vez que inicies sesion.
          ¡Saludos del equipo de LomasDentalCenter!
          Este es un mensaje automático de LomasDentalCenter, si recibiste este correo por error por favor elimínalo.</p>
          <br>
          <b>Usuario:${usuario.USUARIO.toUpperCase()} ,</b>
           <b>Contraseña: ${data.CONTRASEÑA}
           </b>`,
    });

    return res.json({
      ok: true,
      mensaje: "Registrado correctamente",
    });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      const campoDuplicado = Object.keys(error.fields)[0];
      console.log(error);
      return res.status(400).json({
        ok: false,
        mensaje: `${campoDuplicado.replace(/UNIQUE_/g, "")} ya está en uso`,
      });
    } else {
      console.log(error);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }
};

const Update = (req = request, res = response) => {
  let consulta = `UPDATE tbl_persona SET  PRIMER_NOMBRE=upper(?),SEGUNDO_NOMBRE=upper(?), PRIMER_APELLIDO=upper(?), SEGUNDO_APELLIDO=upper(?), DNI=?,FEC_NACIMIENTO=?, SEXO=? WHERE COD_PERSONA=?`;

  let data = req.body;

  db.query(
    consulta,
    [
      data.primern,
      data.segudon,
      data.primera,
      data.segundoa,
      data.dni,
      data.nacimiento,
      data.sexo,
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

const UpdateMedico = (req = request, res = response) => {
  let consulta = `UPDATE tbl_persona SET ID_TIPO_PERSONA = ?, PRIMER_NOMBRE=upper(?),SEGUNDO_NOMBRE=upper(?), PRIMER_APELLIDO=upper(?), SEGUNDO_APELLIDO=upper(?), DNI=?,FEC_NACIMIENTO=?, SEXO=? WHERE COD_PERSONA=?`;

  let data = req.body;

  db.query(
    consulta,
    [
      data.idtipo,
      data.primern,
      data.segudon,
      data.primera,
      data.segundoa,
      data.dni,
      data.nacimiento,
      data.sexo,
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

const UpdatePerfil = (req = request, res = response) => {
  let consulta = `UPDATE tbl_persona SET PRIMER_NOMBRE=?,SEGUNDO_NOMBRE=?, PRIMER_APELLIDO=?, SEGUNDO_APELLIDO=?, DNI=? WHERE COD_PERSONA=?`;

  let data = req.body;

  db.query(
    consulta,
    [
      data.primern,
      data.segudon,
      data.primera,
      data.segundoa,
      data.dni,
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
        data: "Actualizado correctamente",
      });
    }
  );
};

const Delete = (req = request, res = response) => {
  let consulta = "CALL eliminarPersonas(?)";

  let id = req.params.id;

  db.query(consulta, [id], (error, results) => {
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
  });
};
const DeleteMedico = (req = request, res = response) => {
  let consulta = "CALL eliminarPersonas(?)";

  let id = req.params.id;

  db.query(consulta, [id], (error, results) => {
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
  });
};

const SelectM = (req = request, res = response) => {
  let id = req.params.id;

  let consulta =
    "select * from tbl_especialidad_medico tem inner join tbl_persona tp on tem.COD_PERSONA = tp.COD_PERSONA where tem.ID_ESPECIALIDAD = ?";
  db.query(consulta, [id], (error, results) => {
    console.log(results);
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

module.exports = {
  Select,
  Insert,
  Update,
  Delete,
  InsertUserPersona,
  UpdatePerfil,
  SelectId,
  SelectUsuario,
  DeleteMedico,
  SelectMedico,
  InsertMedico,
  UpdateMedico,
  SelectM,
};
