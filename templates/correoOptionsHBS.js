const path = require('path')

const opcionesHBS = () => {

    return {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: path.resolve('./templates/'),
            defaultLayout: false
        },
        viewPath: path.resolve('./templates/'),
        extName: ".handlebars"
    }

}

module.exports = {
    opcionesHBS
}