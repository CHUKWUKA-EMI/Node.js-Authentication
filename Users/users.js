const nodemailer = require('nodemailer')

const mailTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'emichukwuka@gmail.com',
        pass: 'savedbygrace',
    },
    tls: {
        cipher: 'sslv3',
        rejectUnauthorized: false

    }

})
module.exports = mailTransport;