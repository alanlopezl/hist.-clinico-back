/*const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {

    let token = req.headers['authorization'].split(' ')[1];
    token = token.replace(/['"]+/g, '');
    jwt.verify(token, 'clinica1234.', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    }
    );
}

module.exports = { verifyToken }*/
const jwt = require('jsonwebtoken');
const omitValidationRoutes = ['/personauser'];

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Token no proporcionado'
            }
        });
    }
    
    if (omitValidationRoutes.includes(req.path)) {
        // Omitir la validación para rutas específicas
        req.usuario = null;  // O cualquier lógica que desees para omitir la validación
        return next();
    }

    token = token.split(' ')[1];
    token = token.replace(/['"]+/g, '');

    jwt.verify(token, 'clinica1234.', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
}

// Validar Token de correo
const validarCorreoJWT = async (req = request, res = response, next) => {

    // Leer token desde los params
    const { token } = req.params;

    try {

        // Usa semilla de correo
        const { id } = jwt.verify( token, 'correoReset1234.' );
        req.id = id;
        
    } catch (error) {

        // Error de token expirado
        if( error instanceof jwt.TokenExpiredError ) {
            return res.json({
                ok: false,
                msg: 'Token expirado'
            })
        }

        // Token modificado o no válido
        return res.json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    //TODO OK!
    next();

}

// Validar Token de correo
const validarClientMailJWT = async (req = request, res = response, next) => {

    // Leer token desde los params
    const { token } = req.params;

    try {

        // Usa semilla de correo
        const { id, fecha } = jwt.verify( token, 'clinicacliente1234.' );
        req.id = id;
        req.fecha = fecha;

    } catch (error) {

        // Error de token expirado
        if( error instanceof jwt.TokenExpiredError ) {
            return res.json({
                ok: false,
                msg: 'Token expirado'
            })
        }

        // Token modificado o no válido
        return res.json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    //TODO OK!
    next();

}

module.exports = { verifyToken, validarCorreoJWT, validarClientMailJWT }