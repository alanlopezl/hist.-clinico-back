const { response, request } = require("express");
const db = require("../config/config");

const Select = async (req = request, res = response) => {
  let {busqueda} = req.query;
  let consulta = `select * from tbl_ms_parametro where UPPER(VALOR) LIKE '%${busqueda}%' or UPPER(PARAMETRO) LIKE '%${busqueda}%'`;
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

const Insert = async (req = require, res = response) => {
  let consulta =
    "insert into tbl_ms_parametro(PARAMETRO,VALOR,ID_USUARIO) values(?,?,?)";
  let verifica = "select * from tbl_ms_parametro where PARAMETRO = ?";
  let data = req.body;

  db.query(verifica, [data.parametro], (error, results) => {
    if (results.length > 0) {
      return res.json({
        ok: false,
        data: "Ya existe un parametro para este nombre",
      });
    }

    db.query(
      consulta,
      [data.parametro, data.valor, data.cod_user],
      (error, results) => {
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
      }
    );
  });
};

const Update = (req = request, res = response) => {

  let consulta ="update tbl_ms_parametro set PARAMETRO = ?, VALOR = ?, ID_USUARIO = ? where ID_PARAMETRO = ?";
  let data = req.body;
  let verifica = "select * from tbl_ms_parametro where PARAMETRO = ?";
  

  db.query(verifica, [data.parametro], (error, results) => {

    if (results.length > 0) {
      return res.json({
        ok: false,
        data: "Ya existe un parametro para este nombre",
      });
    }
    
  db.query(
    consulta,
    [data.parametro, data.valor, data.cod_user, data.id],
    (error, results) => {
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
    })
})
};
const Delete = (req = request, res = response) => {
  let consulta = "delete from tbl_ms_parametro where ID_PARAMETRO = ?";
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
  Insert,
  Update,
  Delete,
};
