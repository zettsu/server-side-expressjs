const Users = require("../../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {expires} = require("express-session/session/cookie");

module.exports = {
    authenticate: function (req, res, next) {
        console.log(req.body)
        Users.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                return res.status(500).json( { message: err.message })
            }
            if (!user) {
                return res.status(404).json( { message: 'User not found.' })
            }
            if (!user.validPassword(req.body.password)) {
                return res.status(400).json( { message: 'Invalid credentials.' })
            }

            const token = jwt.sign({ id:user._id }, req.app.get('secret-key'), {expiresIn:'7d'})
            res.status(200).json( { user:user, token:token })
        });
    },
    forgotPassword: function (req, res, next) {
        Users.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                return res.status(500).json( { message: err.message })
            }
            if (!user) {
                return res.status(404).json( { message: 'User not found.' })
            }

            res.status(200).json( { message: "Mail sended" })
        });
    }
}