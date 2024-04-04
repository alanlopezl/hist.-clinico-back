const nodemailer = require("nodemailer");

const crearTransporteSMTP = async() => {
	
	return nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: "lomasdentalcenter@gmail.com", // generated ethereal user
            pass: "oqmsmkspaztvsmwt", // generated ethereal password
		}
	})
}





module.exports = {
    crearTransporteSMTP
}