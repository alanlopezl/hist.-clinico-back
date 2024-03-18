const { response, request } = require("express");
const db = require("../config/config");
const CuestionarioPaciente = require("../models/tbl_paciente_cuestionario");
const EnfermedadPaciente = require("../models/tbl_paciente_enfermedad");
const ViewCuestionarioPaciente = require("../models/view_paciente_cuestionario");
const ViewEnfermedadPaciente = require("../models/view_paciente_enfermedad");
const Tratamiento = require("../models/tbl_mo_tratamiento");
const EstadoDiente = require("../models/tbl_estado_diente");
const Odontrograma = require("../models/tbl_odontograma");
const BitacoraPaciente = require("../models/tbl_mo_diente_historial");
const { Op } = require("sequelize");
const ViewOdontrograma = require("../models/view_mo_odontograma");
const pdfMakePrinter = require('pdfmake/src/printer');
const nodemailer = require('nodemailer');

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


// ODONTOGRAMA - TRATAMIENTO
const getTratamientos = async (req = request, res = response) => {
  console.log('hola')
  try {
    let tratamientos = await Tratamiento.findAll();
    return res.json({
      ok: true,
      tratamientos
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor, hable con el administrador',
    });
  }
};

const getEstadoDiente = async (req = request, res = response) => {

  try {
    let estado = await EstadoDiente.findAll({order: ['COMPLETO']});

    return res.json({
      ok: true,
      estado
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor, hable con el administrador',
    });
  }
};

const getDientesOdontograma = async (req = request, res = response) => {
  let {idPaciente} = req.params;
  try {
    const dientes = await ViewOdontrograma.findAll({
      where: {
        ID_PERSONA: idPaciente
      }
    })

    return res.json({
      ok: true,
      dientes
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor, hable con el administrador',
    });
  }
};

const postDienteOdontograma = async (req = request, res = response) => {

  let {tratamiento, lado, numeroDiente, idEstado, idPaciente, observacion} = req.body;
  console.log(idEstado)
  try {
    // Instanciar los estados
    const estadoDiente = await EstadoDiente.findByPk(idEstado);
    if (estadoDiente.COMPLETO) {
      // Eliminar todos los registros existentes
      await Odontrograma.destroy({where: {
        [Op.and]: [
          { ID_PERSONA: idPaciente },
          { INDICE_DIENTE: numeroDiente }
        ]
      }})

      // Guardar todos los lados
      await Odontrograma.bulkCreate([
        {
          ID_PERSONA: idPaciente, LADO_DIENTE: "Arriba", INDICE_DIENTE: numeroDiente, OBSERVACION: observacion, ID_ESTADO: idEstado, ID_TRATAMIENTO: tratamiento,
        }, 
        {
          ID_PERSONA: idPaciente, LADO_DIENTE: "Derecha", INDICE_DIENTE: numeroDiente, OBSERVACION: observacion, ID_ESTADO: idEstado, ID_TRATAMIENTO: tratamiento,
        }, 
        {
          ID_PERSONA: idPaciente, LADO_DIENTE: "Abajo", INDICE_DIENTE: numeroDiente, OBSERVACION: observacion, ID_ESTADO: idEstado, ID_TRATAMIENTO: tratamiento,
        }, 
        {
          ID_PERSONA: idPaciente, LADO_DIENTE: "Izquierda", INDICE_DIENTE: numeroDiente, OBSERVACION: observacion, ID_ESTADO: idEstado, ID_TRATAMIENTO: tratamiento,
        }, 
        {
          ID_PERSONA: idPaciente, LADO_DIENTE: "Centro", INDICE_DIENTE: numeroDiente, OBSERVACION: observacion, ID_ESTADO: idEstado, ID_TRATAMIENTO: tratamiento
        }
      ])
    } else {

      // Revisar registros anteriores
      const diente = await Odontrograma.findOne({where: {
        INDICE_DIENTE: numeroDiente
      }})

      if(diente) {
        const estadoDiente = await EstadoDiente.findByPk(diente.ID_ESTADO);
        if(estadoDiente.COMPLETO) {
          // Eliminar todos los registros del diente
          await Odontrograma.destroy({where: {
            [Op.and]: [
              { ID_PERSONA: idPaciente },
              { INDICE_DIENTE: numeroDiente }
            ]
          }})
        } else {
          // Eliminar el registro existente del lado
          await Odontrograma.destroy({where: {
            [Op.and]: [
              { ID_PERSONA: idPaciente },
              { INDICE_DIENTE: numeroDiente },
              { LADO_DIENTE: lado }
            ]
          }})
        }
      }

      

      // Guardar solo el lado seleccionado
      await Odontrograma.create({
        ID_PERSONA: idPaciente, LADO_DIENTE: lado, INDICE_DIENTE: numeroDiente, OBSERVACION: observacion, ID_ESTADO: idEstado, ID_TRATAMIENTO: tratamiento
      })
    }

    // Guardar en bitácora del diente
    const tratamientoSeleccionado = await Tratamiento.findByPk(tratamiento);
    console.log(tratamientoSeleccionado)
    if (estadoDiente.COMPLETO) {

      // Guardar todos los lados
      await BitacoraPaciente.bulkCreate([
        {
          LADO: "Arriba", ID_PACIENTE: idPaciente, NUMERO_DIENTE: numeroDiente, OBSERVACION: observacion, ESTADO: estadoDiente.NOMBRE, TRATAMIENTO: tratamientoSeleccionado.NOMBRE,
        },
        {
          LADO: "Derecha", ID_PACIENTE: idPaciente, NUMERO_DIENTE: numeroDiente, OBSERVACION: observacion, ESTADO: estadoDiente.NOMBRE, TRATAMIENTO: tratamientoSeleccionado.NOMBRE,
        },
        {
          LADO: "Abajo", ID_PACIENTE: idPaciente, NUMERO_DIENTE: numeroDiente, OBSERVACION: observacion, ESTADO: estadoDiente.NOMBRE, TRATAMIENTO: tratamientoSeleccionado.NOMBRE,
        },
        {
          LADO: "Izquierda", ID_PACIENTE: idPaciente, NUMERO_DIENTE: numeroDiente, OBSERVACION: observacion, ESTADO: estadoDiente.NOMBRE, TRATAMIENTO: tratamientoSeleccionado.NOMBRE,
        },
        {
          LADO: "Centro", ID_PACIENTE: idPaciente, NUMERO_DIENTE: numeroDiente, OBSERVACION: observacion, ESTADO: estadoDiente.NOMBRE, TRATAMIENTO: tratamientoSeleccionado.NOMBRE
        }
      ])
    } else {
      // Guardar solo el lado seleccionado
      await BitacoraPaciente.create({
        LADO: lado, ID_PACIENTE: idPaciente, NUMERO_DIENTE: numeroDiente, OBSERVACION: observacion, ESTADO: estadoDiente.NOMBRE, TRATAMIENTO: tratamientoSeleccionado.NOMBRE
      })
    }

    return res.json({
      ok: true,
      msg: "Información guardada con éxito"
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor, hable con el administrador',
    });
  }
};

const getHistorialDiente = async (req = request, res = response) => {
  let {idPaciente, lado, numDiente} = req.params
  try {
    let historial = await BitacoraPaciente.findAll({
      where : {
        [Op.and]: [
          { ID_PACIENTE: idPaciente },
          { LADO: lado },
          { NUMERO_DIENTE: numDiente }
        ]
      },
      order: [
        ['ID', 'DESC']
      ]
    });

    return res.json({
      ok: true,
      historial
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor, hable con el administrador',
    });
  }
};

const generarPresupuesto = async (req = request, res = response) => {
  let {idPaciente} = req.params
  try {
    const Op = require('sequelize').Op;
    let presupuesto = [];

    ViewOdontrograma.findAll({
      where: {
        ID_PERSONA: idPaciente
      }
    }).then(result => {
      let filteredResult = [];
      let indices = new Set();

      for (let item of result) {
        if (item.COMPLETO === true) {
          if (!indices.has(item.INDICE_DIENTE)) {
            indices.add(item.INDICE_DIENTE);
            filteredResult.push(item);
          }
        } else {
          filteredResult.push(item);
        }
      }

      presupuesto = filteredResult;

      let total = 0.0;
      presupuesto.forEach(tratamiento => {
        total += parseFloat(tratamiento.precio_tratamiento)
      })
      return res.json({
        ok: true,
        presupuesto,
        total
      })
    }).catch(err => {
      console.error(err);
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor, hable con el administrador',
    });
  }
};

const mandarPresupuesto = async (req = request, res = response) => {
  let {html} = req.body
  try {
    

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor, hable con el administrador',
    });
  }
};

module.exports = {
  Select,
  SelectCuestio,
  InsertMedico,
  Insert,
  Delete,
  UpdatePaciente,
  SelectEnfer,
  getAnswers,
  getTratamientos,
  getEstadoDiente,
  postDienteOdontograma,
  getHistorialDiente,
  getDientesOdontograma,
  generarPresupuesto,
  mandarPresupuesto
};
