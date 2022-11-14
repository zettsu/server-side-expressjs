let Bikes = require("../models/bikes");

exports.list_bikes = function (req, res) {
    res.render('bikes/index', { bikes : Bikes.allBikes });

}

exports.create_get = function (req, res) {
    res.render('bikes/create');
}

exports.create_post = function (req, res) {
    let bike = new Bikes(req.body.id, req.body.color, req.body.model, req.body.location);
    Bikes.add(bike);
    res.redirect('/bikes');
}

exports.find = function (req, res) {
    let bike = Bikes.allBikes.find()
}

