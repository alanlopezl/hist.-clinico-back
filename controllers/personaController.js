const { response, request } = require("express");
const db = require("../config/config");
const bcrypt = require('bcryptjs');

const Select = async (req = request, res = response) => {
  let {busqueda} = req.query;
  let consulta = `SELECT * FROM tbl_persona where UPPER(PRIMER_NOMBRE) like '%${busqueda}%' or UPPER(DNI) like '%${busqueda}%' or UPPER(SEXO) like '%${busqueda}%' order by COD_PERSONA DESC`;
  console.log('pruebaaaa')
  await db.query(consulta, (error, results) => {

    if (error) {
      return res.json({
        ok: false,
        msg: error,
      });
    }
    return res.json({
      ok: true,
      data: results
    });
  });
};

const SelectMedico = async (req = request, res = response) => {
  let {busqueda} = req.query;
  let consulta = `SELECT * FROM tbl_persona where ID_TIPO_PERSONA = 1 order by COD_PERSONA DESC`;
  console.log('pruebaaaa')

  await db.query(consulta, (error, results) => {

    if (error) {
      return res.json({
        ok: false,
        msg: error,
      });
    }
    return res.json({
      ok: true,
      data: results
    });
  });
};

// Cargar lista de personas en la pantalla de usuarios
const SelectUsuario = async (req = request, res = response) => {
  let consulta = "SELECT * FROM tbl_persona WHERE COD_PERSONA NOT IN (SELECT COD_PERSONA FROM tbl_ms_usuario)";

  await db.query(consulta, (error, results) => {

    if (error) {
      return res.json({
        ok: false,
        msg: error,
      });
    }
    return res.json({
      ok: true,
      data: results
    });
  });
};

const SelectId =  (req = request, res = response) => {
  let id = req.params.id;

  let consulta = "SELECT * FROM tbl_persona where COD_PERSONA = ?";
   db.query(consulta,[id],(error, results) => {

    if (error) {
      return res.json({
        ok: false,
        msg: error,
      });
    }

    return res.json({
      ok: true,
      data: results
    });
  })
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
   if(data.dni.includes('0000000000000')) {
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
        data.sexo

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
        data.sexo
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
  
  let consulta = `call Insert_Usuario_Test(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  let verificacion = "select * from tbl_ms_usuario where USUARIO = ?";

  await db.query(verificacion, [data.usuario], async (error, results) => {
    if (results.length > 0) {
      return res.json({
        ok: false,
        msg: "Ya existe una persona con el DNI " + data.DNI
      });
    }
    if (results.length > 0) {
      return res.json({
        ok: false,
        msg: "Ya existe un usuario con ese nombre",
      });
    }

    // VALIDAR DNI 
    if (data.DNI && data.DNI.includes('0000000000000')) {
      return res.json({
        msg: true,
        ok: false,
        msg: `No se permiten solo 0 en DNI.`,
      });
    }
    
    // Hashear la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(data.CONTRASEÑA, 10);

    db.query(
      consulta,
      [
        data.PRIMER_NOMBRE,
        data.SEGUNDO_NOMBRE,
        data.PRIMER_APELLIDO,
        data.SEGUNDO_APELLIDO,
        data.DNI,
        data.FEC_NACIMIENTO,
        data.EST_CIVIL,
        data.SEXO,
        data.TELEFONO,
        data.DIREECION,
        data.USUARIO,
        data.EMAIL,
        hashedPassword, 
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

    

    db.query(
      consulta,
      [data.idpersona, data.rol, data.usuario, data.correo, "Hola1234@"],
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
      data.id
    ],
    (error, results) => {
      if (error) {
        return res.json({
          ok: false,
          data: error
        });
      }

      return res.json({
        ok: true,
        data: 'Actualizado correctamente'
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

const SelectM =  (req = request, res = response) => {
  let id = req.params.id;

  let consulta = "select * from tbl_especialidad_medico tem inner join tbl_persona tp on tem.COD_PERSONA = tp.COD_PERSONA where tem.ID_ESPECIALIDAD = ?";
   db.query(consulta,[id],(error, results) => {
console.log(results);
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
  })
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
  SelectM
  
};
