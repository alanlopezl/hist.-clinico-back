const { response, request } = require("express");
const db = require("../config/config");

const Select = async (req = request, res = response) => {
  let {busqueda} = req.query;
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
      data: results
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


module.exports = {
  Select,
  InsertMedico
};
