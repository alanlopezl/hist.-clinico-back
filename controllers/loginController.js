const { response, request } = require('express')
const db = require('../config/config');
const jwt = require('jsonwebtoken');

const { desects } = require('../helpers/helpers');



const Login = (req = request, res = response) => {
    let consulta = 'call login(?,?)';

    let { user, pass } = req.body;
    db.query(consulta, [user, pass], (error, results) => {
    
        if (error) return res.json({ ok: false, msg: error });
        let {codigo} = desects(results);
        
        if(codigo == 1){
            let {  mensaje } = desects(results);
            return res.json({
                ok: false,
                msg: mensaje
            });
        }else{
            let {ID_USUARIO} = desects(results);
            
            const payload = {
                id: ID_USUARIO
            }
         
            // const token = jwt.sign(payload, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
            const token = jwt.sign(payload, 'clinica1234.', { expiresIn: '24h' });
            return res.json({
                ok: true,
                token: token,
                data:desects(results)
            });
        }
    });
}


const UpdatePass = async(req = require, res = response)=>{

    let consulta = `update tbl_ms_usuario set CONTRASEÑA = ?,ESTADO = 'Activo' where COD_USUARIO = ?`;
    let consultaHist = `INSERT INTO agrocomercial.tbl_ms_his_contrasena(COD_USUARIO, CONTRASENA) VALUES(?,?)`;

    let data = req.body;
    await db.query(consulta, [data.pass, data.id], (error, results) => {
        if (error) {
          return res.json({
            ok: false,
            data: error,
          });
        }
        db.query(consultaHist, [data.id, data.pass], (error, result) => {
          return res.json({
            ok: true,
            data: results,
          });
        });
      });

}


module.exports = {
    Login,
    UpdatePass
}

