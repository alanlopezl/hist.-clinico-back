const { response, request } = require("express");
const db = require("../config/config");
const { destrucdata } = require("../helpers/helpers");

const Select = (req = request, res = response) => {
  let {busqueda} = req.query;
  let consulta =
    `select * from tbl_ms_permiso pp inner join tbl_ms_objeto po on pp.id_OBJETO  = po.id_OBJETO INNER JOIN tbl_ms_rol tr on pp.ID_ROL = tr.ID_ROL where UPPER(OBJETO) like '%${busqueda}%' or UPPER(NOMBRE_ROL) like '%${busqueda}%'`;
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


const SelectPermisoSistem = (req = request, res = response) => {
  let consulta =
    "select * from tbl_ms_permiso where ID_ROL = ? and ID_OBJETO = ?";
  let data = req.params;

  db.query(consulta, [data.rol, data.objeto], (error, results) => {
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

//select * from tbl_permisos tp where COD_ROL = 1 and COD_OBJETO = 1

const selectpermisos = (req = request, res = response) => {
  let consulta =
    "select s.* from tbl_ms_objeto s inner join tbl_ms_permiso tp2 on s.ID_OBJETO = tp2.ID_OBJETO where tp2.CONSULTAR = 'SI' and tp2.ID_ROL = ?";
  let id = req.params.id;
  db.query(consulta, [id], (error, results) => {
    let menus = [];
    const data = Object.values(JSON.parse(JSON.stringify(results)));
   
    let m = 0;
    for (let i = 0; i < data.length; i++) {
      menus.push({
        CODOBJETO: data[i].ID_OBJETO,
        NOMOBJETO: data[i].OBJETO,
        ICONO: data[i].ICONO,
        URL: data[i].URL,
        ID_PADRE: data[i].ID_PADRE,
        hijos: [],
      });

      for (let j = 0; j < data.length; j++) {
        if (data[i].ID_OBJETO == data[j].ID_PADRE) {
          menus[m].hijos.push(data[j]);
        }
      }
      m++;
    }

    return res.json({
      ok: true,
      data: menus
    });
  });
};

const Insert = async (req = require, res = response) => {
  let data = req.body;

  let verifica ="select * from tbl_ms_permiso where ID_ROL = ? and ID_OBJETO = ?";
  let consulta = `INSERT INTO tbl_ms_permiso(ID_ROL,ID_OBJETO,INSERTAR,ACTUALIZAR,CONSULTAR,ELIMINAR)VALUES(?,?,?,?,?,?)`;

  await db.query(verifica, [data.rol, data.objeto], (error, results) => {
    
    if (results.length > 0) {
      return res.json({
        ok: false,
        data: "Ya existe permiso para este menu",
      });
    }
    db.query(
      consulta,
      [
        data.rol,
        data.objeto,
        data.insertar,
        data.actualizar,
        data.consultar,
        data.eliminar,
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
          data: results,
        });
      }
    );
  });
};

const Update = (req = request, res = response) => {
  let consulta = `UPDATE tbl_ms_permiso SET ID_ROL=?, ID_OBJETO=?, INSERTAR=?, ACTUALIZAR=?, CONSULTAR=?, ELIMINAR=? WHERE ID_PERMISO=?`;

  let data = req.body;

  db.query(
    consulta,
    [
      data.rol,
      data.objeto,
      data.insertar,
      data.actualizar,
      data.consultar,
      data.eliminar,
      data.permiso,
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
  let consulta = "CALL DLELETE_PERMISOS(?,?)";
  let data = req.body;
  db.query(consulta, [data.idrol, data.idobjeto], (error, results) => {
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
  selectpermisos,
  SelectPermisoSistem,
};
