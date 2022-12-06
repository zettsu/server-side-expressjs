let Users = require("../models/users");

exports.list = async function (req, res) {
    let users = await Users.findAll();
    if (users === null){
        users = []
    }
    res.render('users/index', { errors: {}, users : users });
}

exports.create_get = function (req, res) {
    res.render('users/create', { errors: {}, user:{name:'', email:''}});
}

exports.update_get = function (req, res) {
    Users.findById(req.params.id, function (err, user) {
        res.render('users/update', { user: user, errors:{} });
    });
}

exports.update_post = function (req, res) {
    const updated_values = { name:req.body.name }
    Users.findByIdAndUpdate(req.params.id, updated_values, function (err, user) {
        if (err) {
            console.log(err)
            res.redirect('/users/update');
        }else {
            res.redirect('/users');
        }
    })
}

exports.create_post = function (req, res) {
    if (req.body.password !== req.body.confirm_pwd) {
        res.render('users/create', {errors: {confirm_pwd:"Password dont match"}, user: new Users({name: req.body.name,email:req.body.email})});
        return
    }

    Users.create({name: req.body.name,email:req.body.email, password: req.body.password}, function (err, user) {
        if (err) {
            console.log(err)
            res.redirect('/users/create', {errors:err.errors, user: new Users({name: req.body.name,email:req.body.email, password:''})});
        }else {
            user.welcomeMail(function (err) {
                console.log(err)
                res.redirect('/users/create', {errors:err.errors, user: new Users({name: req.body.name,email:req.body.email, password:''})});
            })
            res.redirect('/users');
        }
    });
}

exports.delete = function (req, res, next) {
    Users.findByIdAndDelete(req.body.id, function (err) {
        if (err) {
            console.log(err)
            next(err);
        }else {
            res.redirect('/users');
        }
    });
}

