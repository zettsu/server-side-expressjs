let Bikes = require("../models/bikes");

exports.json_bikes = function (req, res) {
    res.json({ bikes : Bikes.findAll() });
}

exports.list_bikes = async function (req, res) {
    let bikes = await Bikes.findAll();
    if (bikes === null){
        bikes = []
    }
    res.render('bikes/index', { bikes : bikes });
}

exports.create_get = function (req, res) {
    res.render('bikes/create');
}

exports.update_get = function (req, res) {
    Bikes.findByCode(req.params.id, function (err, bike) {
        res.render('bikes/update',{bike:bike});
    });
}

exports.update_post = function (req, res) {
    Bikes.findByCode(req.params.id, async function (err, bike) {
        bike.color = req.body.color;
        bike.model = req.body.model;
        bike.location = [req.body.lat, req.body.long];
        await Bikes.updateBike(req.params.id, bike);
        res.redirect('/bikes');
    });
}

exports.create_post = function (req, res) {
    let bike = Bikes.createInstance(req.body.id, req.body.color, req.body.model, [req.body.lat, req.body.long]);
    Bikes.addBike(bike);
    res.redirect('/bikes');
}

exports.delete_post = function (req, res) {
    Bikes.remove(req.body.id);
    res.redirect('/bikes');
}

