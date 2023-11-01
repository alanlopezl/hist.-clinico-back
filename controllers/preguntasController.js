const { response, request } = require("express");
const db = require("../config/config");

const Select = (req = request, res = response) => {
  let {busqueda} = req.query;
  let consulta = `SELECT * FROM tbl_ms_pregunta where UPPER(PREGUNTA) like '%${busqueda}%'`;
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

const SelectParam = (req = request, res = response) => {
  let consulta = "call PreguntasLogin()";
  db.query(consulta, (error, results) => {
    if (error) {
      return res.json({
        ok: false,
        msg: error,
      });
    }
    return res.json({
      ok: true,
      data: results[0],
    });
  });
};

const Insert = async (req = require, res = response) => {
  let verificacion = "select * from tbl_ms_pregunta where PREGUNTA = ?";
  let consulta = `INSERT INTO tbl_ms_pregunta
    (PREGUNTA) VALUES(?)`;

  let data = req.body;

  await db.query(verificacion, [data.pregunta], (error, results) => {
    
    if (results.length > 0) {
      return res.json({
        ok: false,
        msg: "Ya existe una pregunta",
      });
    }

    db.query(consulta, [data.pregunta, data.estado], (error, results) => {
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
  });
};

const InsertPreguntaUsuario = async (req = require, res = response) => {
  let consulta = `call InsertPreguntasUser(?,?,?)`;

  let data = req.body;

  await db.query(
    consulta,
    [data.pregunta, data.usuario, data.respuesta],
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

const Update = async (req = request, res = response) => {
  let consulta = `UPDATE tbl_ms_pregunta
    SET PREGUNTA=?
    WHERE ID_PREGUNTA=?`;
  let verificacion = "select * from tbl_ms_pregunta where PREGUNTA = ?";

  let data = req.body;

  await db.query(verificacion, [data.pregunta], (error, results) => {
    if (results.length > 0) {
      return res.json({
        ok: false,
        msg: "Ya existe una pregunta",
      });
    }
    db.query(
      consulta,
      [data.pregunta, data.id],
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

const Delete = (req = request, res = response) => {
  let consulta = "DELETE FROM tbl_ms_pregunta WHERE ID_PREGUNTA=?";
  let id = req.params.id;

  db.query(consulta, [id], (error, results) => {
    if (error) return res.json({ ok: false, data: error });

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
  SelectParam,
  InsertPreguntaUsuario,
};
