const { response, request } = require('express')
const mysqldump = require('mysqldump');
const db = require('../config/config')
const path = require('path');
const mysql = require('mysql2')
const { exec } = require('child_process');

const Select = (req = request, res=response) => {
    
    let consulta = 'SELECT * FROM tbl_backup';
     db.query(consulta, (error, results) => {
        if (error) {
            return res.json({
                ok: false,
                msg: error
            });
        }
        return res.json({
            ok: true,
            data: results
        });
    });
}

const restore = async (req = request, res = response) => {

    const ruta = `b45qckupp.sql`

   


 await  require('mysql-import').config({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'historial_clinico(7)',
        onerror: err=>console.log(err.message)
    }).import('./backup/5-12-2022-Backup.sql').then(()=> {
        console.log('all statements have been executed')
    });
   
    return res.json({
        ok: true
    });


}

//Crear datos de bitacora (insert)
const backup = async (req = require, res = response) => {

    //backup 12/12-12
    const fecha = new Date().toLocaleDateString();
    const nuevafecha = fecha.replaceAll("/", "-");
    const ruta = `backup/${nuevafecha}-Backup.sql`
    const data = await mysqldump({
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'historial_clinico(7)'
        },
        dumpToFile: `./${ruta}`,
        data: true

    });

    await db.query(`INSERT INTO tbl_backup(NOMBRE,USUARIO_REGISTRO,FECHA_REGISTRO) values ('${ruta}','${req.body.nombre}',sysdate())`,(errors, result) => {

       if (errors) return res.json({ok:false, msg:errors});

        return res.json({
            ok : true, 
            msg: result
        });

     })

}

/*
const postBackup = async (req = request, res = response) => {
    
    let {nombreBackup=''} = req.body

    try {
        // Crear backup de la base de datos
        // const backup = await generarBackupParaApi(nombreBackup, ubicacion);
        // var child = exec( `mysqldump -u ${process.env.SQL_USER} -p ${process.env.SQL_PASSWORD} ${process.env.ESQUEMA} > src/server/backups/${nombreBackup}.sql`);
        const cmd = `"${process.env.PATH_W}mysqldump" -u ${process.env.SQL_USER} -p${process.env.SQL_PASSWORD} ${process.env.ESQUEMA} -P ${process.env.SQL_PORT} --skip-column-statistics> backups/backup.sql`
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
              console.log(`Error al exportar la base de datos: ${error.message}`);
              return;
            }
            if (stderr) {
                res.download(
                  __dirname +
                    "/../backups/backup.sql",
                  (err) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("success");
                    }
                  }
                );
                
                return;
            }
            console.log('Backup creado correctamente');
            
          });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message
        })
    }       
        
}*/
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const postBackup = async (req = request, res = response) => {
    console.log('Solicitud recibida en postBackup');
    
    let { nombreBackup = '' } = req.body;

    try {
        const cmd = `"${process.env.PATH_W}mysqldump" -u ${process.env.SQL_USER} -p${process.env.SQL_PASSWORD} ${process.env.ESQUEMA} -P ${process.env.SQL_PORT} --skip-column-statistics > backups/backup.sql`;

        await exec(cmd);

        res.download(__dirname + '/../backups/backup.sql', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Descarga exitosa');
            }
        });
    } catch (error) {
        console.error('Error al ejecutar el comando mysqldump:', error);
        res.status(500).json({
            msg: error.message,
        });
    }
};


const putBackup = async(req, res = response) =>{
   
    const {backup} = req.files;

    console.log(backup)
    const uploadPath = path.join( __dirname, "../backups/", backup.name);

    await backup.mv(uploadPath, (err) => {
        if( err ){
            return res.status(500).json({err})
        }
    })

    const cmd = `"${process.env.PATH_W}mysql" -u ${process.env.SQL_USER} -p${process.env.SQL_PASSWORD} ${process.env.ESQUEMA} -P ${process.env.SQL_PORT} < backups/"${backup.name}"`
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            res.status(400).json({ok: false, msg: `Error al restaurar la base de datos`})
            console.error(`Error al restaurar la base de datos: ${error}`);
            return;
        }

        return res.json({ok: true, msg: `Base de datos restaurada correctamente`})
      });


}

module.exports = {
    restore,
    backup,
    Select,
    postBackup,
    putBackup
}