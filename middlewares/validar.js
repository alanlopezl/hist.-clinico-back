//const { validationResult } = require('express-validator')

const validarCampos = (req, res, next) => {
    const errors = validationResult( req );
    // Si existen errores
    if ( !errors.isEmpty() ) {

        const { msg } = errors.errors[0]    // Extraer mensaje de error
        let mensaje = msg;
        console.log(mensaje)
        // Disparar el error
        return res.status(400).json({
            ok: false,
            msg,
            mensaje,
        })
    }

    next();
}

module.exports = {
    validarCampos
}