"use strict";
const nodemailer = require("nodemailer");
const from = 'rickey.murphy5@ethereal.email';
const sgTransport = require('nodemailer-sendgrid-transport')

module.exports = {
    smtp: function () {
        if (process.env.NODE_ENV === 'production') {
            return sgTransport({api_key:process.env.SEND_GRID_API_KEY});
        }else if(process.env.NODE_ENV === 'stagging')  {
            return sgTransport({api_key:process.env.SEND_GRID_API_KEY});
        }else {
            return nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: process.env.ETHEREAL_MAIL_USER,
                    pass: process.env.ETHEREAL_MAIL_PASS
                }
            });
        }
    },
    send: function (to, subject, body, cb) {
        this.smtp().sendMail({ from :from, to:to, subject:subject, text:body}, cb);
    }
}



