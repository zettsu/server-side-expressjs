let Users = require("../models/users");
let Token = require("../models/token");

module.exports = {
    confirmationGet: function (req, res, next) {
        Token.findOne({token:req.params.token}, function (err, token) {
            if (!token) { return res.status(404).send({msg: 'Token not found!'})}
            Users.findById(token._userId, function (err, user) {
                if (!user) { return res.status(404).send({msg: 'User not found!'})}
                if (user.verified) { return res.redirect('/users')}
                user.verified = true;
                user.save(function (err) {
                    if (err) { return res.status(500).send({msg: err.message})}
                    res.redirect('/')
                });
            });
        });
    }
}
