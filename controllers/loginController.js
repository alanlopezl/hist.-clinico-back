const { response, request } = require('express')
const db = require('../config/config');
const jwt = require('jsonwebtoken');
const Usuarios = require('../models/tbl_usuarios'); // Asegúrate de que la ruta sea correcta

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
/*
const Login = async (req, res) => {

  let consulta = 'call login(?,?)';
  let { user, pass } = req.body;

  try {
   

    // Verificar si el usuario existe en la base de datos
    const usuario = await Usuarios.findOne({ where: { USUARIO: user } });
    const intentosParams = await Parametro.findOne({ where: { PARAMETRO: 'ADMIN_INTENTOS' } });

    // Si el usuario no existe, devolver un mensaje de error
    if (!usuario) {
      return res.json({
        ok: false,
        msg: 'Usuario y contraseña son inválidos'
      });
    }

    // Verificar la contraseña utilizando bcrypt
   // const validarPass = await bcrypt.compare(pass, usuario.CONTRASEÑA);

    // Si la contraseña no es válida, realizar lógica de bloqueo y retornar mensajes
    if (!validarPass) {
      usuario.INTENTOS++;

      // Comparar intentos del usuario para bloquearlo si es necesario
      if (usuario.INTENTOS === parseInt(intentosParams.VALOR, 10) && usuario.USUARIO !== 'ADMINISTRADOR') {
        usuario.ESTADO = 'Bloqueado';

        // Guardar evento en la bitácora
        eventBitacora(new Date(), usuario.ID_USUARIO, 1, 'Bloqueo', 'El usuario fue bloqueado en el Login');

        // Notificar por correo
        await usuario.save();

        return res.json({
          ok: false,
          msg: 'Se ha bloqueado el usuario, comuníquese con el administrador'
        });
      }

      // Guardar evento en la bitácora
      eventBitacora(new Date(), usuario.ID_USUARIO, 1, 'Ingreso', 'Intento fallido de inicio de sesión');

      // Retornar mensajes de error según la cantidad de intentos restantes
      if (parseInt(intentosParams.VALOR, 10) - usuario.INTENTOS === 1 && usuario.USUARIO !== 'ADMINISTRADOR') {
        await usuario.save();
        return res.json({
          ok: false,
          msg: 'Usuario y contraseña son inválidos. Solo tiene 1 intento disponible'
        });
      }

      await usuario.save();

      return res.json({
        ok: false,
        msg: 'Usuario y contraseña son inválidos'
      });
    }

    // Si la contraseña es válida, ejecutar la consulta a la base de datos utilizando el procedimiento almacenado
    db.query(consulta, [user, pass], (error, results) => {
      if (error) {
        return res.json({ ok: false, msg: error });
      }

      let { codigo } = desects(results);

      if (codigo === 1) {
        let { mensaje } = desects(results);
        return res.json({
          ok: false,
          msg: mensaje
        });
      } else {
        let { ID_USUARIO } = desects(results);

        const payload = {
          id: ID_USUARIO
        };

        // Generar el token JWT
        const token = jwt.sign(payload, 'clinica1234.', { expiresIn: '24h' });

        return res.json({
          ok: true,
          token: token,
          data: desects(results)
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error en el servidor'
    });
  }
};*/



const UpdatePass = async(req = require, res = response)=>{

    console.log('PRUEBAAAAAAAAAAAAAAAAAAAAAA')
    let consulta = `update tbl_ms_usuario set PASSWORDD = ?,ID_ESTADO = 1 where USUARIO = ?`;
    let consultaHist = `INSERT INTO tbl_ms_his_contrasena(ID_USUARIO, PASSWORDD) VALUES(?,?)`;

    let data = req.body;
    console.log(data);
    await db.query(consulta, [data.pass, data.id], (error, results) => {
        if (error) {
          return res.json({
            ok: false,
            data: error
          });
        }
        db.query(consultaHist, [data.id, data.pass], (error, result) => {
          return res.json({
            ok: true,
            data: results
          });
        });
      });

}


module.exports = {
    Login,
    UpdatePass
}

