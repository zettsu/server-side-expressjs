let Bikes = require("../../models/bikes");

exports.get = function (req, res) {
    res.json({ bikes : Bikes.findAll() });
}

exports.getById = function (req, res) {
    try {
        res.json(Bikes.find(req.params.id));
    }catch (e){
        return res.status(404).json({message: e.message});
    }
}

exports.create = function (req, res) {
    if (Bikes.exists(req.body.id)) {
        return res.status(400).json({message: "Already exists"});
    }

    let bike = new Bikes(req.body.id, req.body.color, req.body.model, [req.body.lat, req.body.long]);
    Bikes.add(bike);
    res.status(201).json(bike);
}

exports.update = function (req, res) {
    try{
        Bikes.update(req.params.id, req.body.color, req.body.model, [req.body.lat,req.body.long]);
        res.json(Bikes.find(req.params.id));
    }catch (e){
        res.status(404).json({message:e.message});
    }
}

exports.delete = function (req, res) {
    try {
        Bikes.remove(req.params.id);
        return res.status(200).json();
    }catch (e){
        return res.status(404).json({message:e.message});
    }
}
