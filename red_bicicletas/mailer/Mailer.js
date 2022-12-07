"use strict";
const nodemailer = require("nodemailer");
const from = 'rickey.murphy5@ethereal.email';

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
    },
    send: function (to, subject, body, cb) {
        this.smtp().sendMail({ from :from, to:to, subject:subject, text:body}, cb);
    }
}



