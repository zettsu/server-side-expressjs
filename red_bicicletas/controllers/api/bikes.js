let Bikes = require("../../models/bikes");


exports.get = async function (req, res) {
    return res.json({ bikes : await Bikes.findAll()});
}

exports.getById = async function (req, res) {
    try {
        const bike = await Bikes.findByCode(req.params.code);
        if (bike == null) {
            return res.status(404).json({message: "Not found"});
        }
        return res.json(bike);
    }catch (e){
        return res.status(404).json({message: e.message});
    }
}

exports.create = async function (req, res) {
    const bike = await Bikes.findByCode(req.body.code);
    if (bike !== null) {
        return res.status(400).json({message: "Already exists"});
    }
    let createdBike = await Bikes.addBike(Bikes.createInstance(req.body.code, req.body.color, req.body.model, req.body.location));
    return res.status(201).json(createdBike);
}

exports.update = async function (req, res) {
    try{
        const updatedBike = await Bikes.updateBike(req.params.code,{"color":req.body.color,  "model":req.body.model, "location":req.body.location});
        if (updatedBike == null) {
            return res.status(404).json({message: "Not found"});
        }
        return res.json(updatedBike);
    }catch (e){
        return res.status(500).json({message:e.message});
    }
}

exports.delete = async function (req, res) {
    try {
        let result = await Bikes.removeByCode(req.params.code);
        if (result.deletedCount) {
            return res.status(200).json();
        }
        return res.status(500).json({message:"Error deleting bike"});
    }catch (e){
        return res.status(404).json({message:e.message});
    }
}
