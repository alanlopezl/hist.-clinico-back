const { response, request } = require("express");
const db = require("../config/config");
const CuestionarioPaciente = require("../models/tbl_paciente_cuestionario");
const EnfermedadPaciente = require("../models/tbl_paciente_enfermedad");
const ViewCuestionarioPaciente = require("../models/view_paciente_cuestionario");
const ViewEnfermedadPaciente = require("../models/view_paciente_enfermedad");

const Select = async (req = request, res = response) => {
  let { busqueda } = req.query;
  let consulta = `SELECT * FROM tbl_persona where  ID_TIPO_PERSONA = 2 order by COD_PERSONA DESC`;

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

const SelectCuestio = async (req = request, res = response) => {
  let { busqueda } = req.query;
  let consulta = `SELECT * FROM tbl_cuestionario`;

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

const SelectEnfer = async (req = request, res = response) => {

  let consulta = `SELECT * FROM tbl_enfermedad`;

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
const InsertMedico = async (req = require, res = response) => {
  let data = req.body;

  let verificacion = "select * from tbl_persona where DNI = ?";
  let consulta = `INSERT INTO tbl_persona (ID_TIPO_PERSONA,PRIMER_NOMBRE, SEGUNDO_NOMBRE, PRIMER_APELLIDO, SEGUNDO_APELLIDO, DNI, FEC_NACIMIENTO, SEXO, EDAD, EMAIL, EST_CIVIL, TELEFONO, OCUPACION, CONTACTO_EMERGENCIA, CONTACTO_EMER_TEL, OBSERVACIONES, DIRECCION)
    VALUES(?,upper(?),upper(?),upper(?),upper(?),?,?,?,?,?, ?, ?, ?, ?, ?, ?, ?)`;

  // VALIDAR DNI Y TÉLEFONO FOCK
  if (data.dni.includes("0000000000000")) {
    return res.json({
      msg: true,
      ok: false,
      msg: `No se permiten solo 0 en DNI.`,
    });
  }

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
        data.sexo,
        data.edad,
        data.email,
        data.civil,
        data.tel,
        data.ocupacion,
        data.cont_emer,
        data.emer_tel,
        data.obs,
        data.dir,
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

const getAnswers = async (req = require, res = response) => {
  let {idPaciente} = req.params;

  try {

    let respuestas = await ViewCuestionarioPaciente.findAndCountAll({where: {COD_PERSONA: idPaciente}});
    let enfermedades = await ViewEnfermedadPaciente.findAll({where: {COD_PERSONA: idPaciente}})
    
    res.json({
      ok: true,
      respuestas,
      enfermedades
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor, hable con el administrador',
    });
  }
}

const Insert = async (req = require, res = response) => {
  let data = req.body;

  let { cuest, enfer, idPaciente } = data;

  // DESTRUIR TODOOOOOO LO ANTERIOR :D! MUAJAJAJA
  await CuestionarioPaciente.destroy({
    where: {
      COD_PERSONA: idPaciente
    }
  })

  await EnfermedadPaciente.destroy({
    where: {
      COD_PERSONA: idPaciente
    }
  })

  let consulta = `INSERT INTO tbl_persona_cuestionario (ID_CUESTIONARIO, COD_PERSONA, RESP)VALUES ? `;
  let consulta1 = `INSERT INTO tbl_enfermedad_paciente (COD_PERSONA, ID_ENFERMEDAD, RESP) VALUES ? `;

  console.log(cuest);

  let todoCuestionario = [];
  let todoEnfermedad = [];

  for (let i = 0; i < cuest.length; i++) {
    todoCuestionario.push([cuest[i].id, cuest[i].paciente, cuest[i].value]);
  }

  for (let i = 0; i < enfer.length; i++) {
    todoEnfermedad.push([enfer[i].paciente, enfer[i].id, enfer[i].value]);
  }

  db.query(consulta, [todoCuestionario], (error, results1) => {
    if (error) {
      return res.json({
        ok: false,
        data: error,
      });
    }

    // Evitar fallos si no llega nada
    if(todoEnfermedad.length > 0) {
      db.query(consulta1, [todoEnfermedad], (error, results) => {
        if (error) {
          return res.json({
            ok: false,
            data: error,
          });
        }
  
      });
    }
    return res.json({
      ok: true,
    });
  });
};
const UpdatePaciente = (req = request, res = response) => {
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
const Delete = (req = request, res = response) => {
  let consulta = "DELETE FROM tbl_persona WHERE COD_PERSONA=?";
  let id = req.params.id;

  db.query(consulta, [id], (error, results) => {
    if (error) return res.json({ ok: false, data: error });

    return res.json({
      ok: true,
      data: results,
    });
  });
};

module.exports = {
  Select,
  SelectCuestio,
  InsertMedico,
  Insert,
  Delete,
  UpdatePaciente,
  SelectEnfer,
  getAnswers
};
