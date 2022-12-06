"use strict";
const nodemailer = require("nodemailer");

module.exports = {
    smtp: function (){
        return nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'rickey.murphy5@ethereal.email',
                pass: 'FqyfY311JuxV2NK82V'
            }
    });
}
}



