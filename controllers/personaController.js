const { response, request } = require("express");
const db = require("../config/config");

const Select = async (req = request, res = response) => {
  let {busqueda} = req.query;
  let consulta = `SELECT * FROM tbl_persona where UPPER(PRIMER_NOMBRE) like '%${busqueda}%' or UPPER(DNI) like '%${busqueda}%' or UPPER(SEXO) like '%${busqueda}%' order by COD_PERSONA DESC`;
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

const SelectUsuario = async (req = request, res = response) => {
  let consulta = "select * from tbl_persona";
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

  let verificacion = "select * from tbl_persona where DNI = ?";
  let consulta = `call RegistroUsuario(?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  await db.query(verificacion, [data.DNI], (error, results) => {

    if (results.length > 0) {
      return res.json({
        ok: false,
        msg: "Ya existe una persona con el DNI " + data.DNI
      });
    }
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
        data.CONTRASEÑA,
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

module.exports = {
  Select,
  Insert,
  Update,
  Delete,
  InsertUserPersona,
  UpdatePerfil,
  SelectId,
  SelectUsuario,
  SelectMedico,
  InsertMedico,
  UpdateMedico
  
};
