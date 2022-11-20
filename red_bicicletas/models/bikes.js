let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bikesSchema = new Schema({
    code: Number,
    color: String,
    model: String,
    location: {
        type: [Number], index: { type: '2dsphere',sparse:true }
    }
});

bikesSchema.statics.createInstance = function (code, color, model, location){
    return new this({
        code: code,
        color: color,
        model: model,
        location: location
    });
};

bikesSchema.methods.toString = function (){
    return 'code' + this.code + ' color:'+ this.color;
};

bikesSchema.statics.findAll = function(){
    return this.find();
}

bikesSchema.statics.findById = function (code) {
    return this.find({ code : code});
}



let Bikes = mongoose.model("Bikes", bikesSchema);
module.exports = Bikes;

/*
let Bikes = function (id, color, model, location) {
    this.id = id;
    this.color = color;
    this.model = model;
    this.location = location;
}

Bikes.all = [];

Bikes.findAll = function () {
    return Bikes.all;
}

Bikes.add = function (bike) {
    Bikes.all.push(bike);
}

Bikes.find = function (id) {
    let bike = Bikes.all.find((bike) => bike.id.toString() === id.toString());
    if(bike === undefined) {
        throw new Error("Bike not found for provided id.");
    }
    return bike;
}

Bikes.update = function (id, color, model, location) {
    let bike = Bikes.find(id);
    bike.color = color;
    bike.model = model;
    bike.location = location;
    return bike;
}

Bikes.remove = function (id) {
    let bikeId = Bikes.all.findIndex((bike) => bike.id.toString() === id.toString());
    if(bikeId === -1) {
        throw new Error("No existe una bicicleta por ese id");
    }
    Bikes.all.splice(bikeId, 1);
    return true;
}

function dummyData() {
    Bikes.add(new Bikes("1", "red", "Trinx urban", [-34.935404,-56.160398]));
    Bikes.add(new Bikes("2", "blue", "GT Agressor MB", [-34.930813,-56.159797]));
}

Bikes.getLength = function (){
    return Bikes.all.length;
}

Bikes.exists = function (id) {
    return Bikes.all.find((bike) => bike.id.toString() === id.toString()) !== undefined;
}

dummyData();
module.exports = Bikes;

 */