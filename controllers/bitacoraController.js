const { response, request } = require("express");
const db = require("../config/config");

const Select = (req = request, res = response) => {
  let { busqueda } = req.query;
  let consulta = `select b.*,tu.USUARIO  from tbl_ms_bitacora b inner join tbl_ms_usuario tu on b.ID_USUARIO = tu.ID_USUARIO ORDER BY b.ID_BITACORA DESC`;
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

const Insert = async (req = require, res = response) => {
  let consulta =
    "INSERT into tbl_ms_bitacora(ACCION,FECHA,ID_USUARIO,TABLA_MODIFICADA) VALUES(?,?,?,?)";

  let data = req.body;

  await db.query(
    consulta,
    [data.operacion, data.fecha, data.idusuario, data.tabla],
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

const Update = async (req = require, res = response) => {
  let consulta =
    "INSERT into tbl_ms_bitacora(ACCION,FECHA,COD_USUARIO,TABLA_MODIFICADA) VALUES(?,?,?,?)";

  let data = req.body;

  await db.query(
    consulta,
    [data.operacion, data.fecha, data.idusuario, data.tabla],
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

const Delete = async (req = request, res = response) => {
  let consulta = "delete from tbl_ms_bitacora";
  await db.query(consulta, (error, results) => {
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
  Delete,
};
