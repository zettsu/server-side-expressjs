let Users = require("../models/users");
let Token = require("../models/token");

module.exports = {
    forgotPasswordPost: function (req, res, next) {
        Users.findOne({email:req.body.email}, function (err, user) {
            if (!user) { return res.render('session/forgotPassword', { info: {message:'Email not found'}}) }
            user.resetPassword(function (err) {
                if (err) { return next(err)}
                console.log('Error on session/forgotPassword:'+err.message)
            });
            res.render('session/forgotPassword')
        });
    },
    resetPasswordGet: function (req, res, next) {
        Token.findOne({token:req.params.token}, function (err, token) {
            if (!token) { return res.status(400).send( { type:'not-verified', msg: 'Please try again.'}) }
            user.findById(token._userId, function (err, user) {
                if (!user) { return res.status(400).send( { msg: 'User not found!'}) }
                res.render('session/resetPassword', {errors:{}, user:user})
            });
            res.render('session/forgotPassword')
        });
    },
    resetPasswordPost: function (req, res, next) {
        if (req.body.password !== req.confirm_password) {
            return res.render('session/resetPassword', {errors:{confirm_password: {message:'Password dont match'}}, user: new User({email:req.body.email})});
        }
        Users.findOne({email:req.body.email}, function (err, user) {
            user.password = req.body.password;
            user.save(function (err) {
                if (err){
                    return res.render('session/resetPassword', {errors: err.errors, user: new User({email:req.body.email})});
                }else {
                    res.redirect('/login');
                }
            })
        })
    },
}