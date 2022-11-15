let Bikes = require("../models/bikes");

exports.json_bikes = function (req, res) {
    res.json({ bikes : Bikes.allBikes });
}

exports.list_bikes = function (req, res) {
    res.render('bikes/index', { bikes : Bikes.allBikes });
}

exports.create_get = function (req, res) {
    res.render('bikes/create');
}

exports.update_get = function (req, res) {
    res.render('bikes/update',{bike:Bikes.find(req.params.id)});
}

exports.update_post = function (req, res) {
    Bikes.update(req.params.id, req.body.color, req.body.model, [req.body.lat,req.body.long]);
    res.redirect('/bikes');
}

exports.create_post = function (req, res) {
    let bike = new Bikes(req.body.id, req.body.color, req.body.model, [req.body.lat,req.body.long]);
    Bikes.add(bike);
    res.redirect('/bikes');
}

exports.delete_post = function (req, res) {
    Bikes.remove(req.body.id);
    res.redirect('/bikes');
}

