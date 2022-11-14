let Bikes = function (id, color, model, location) {
    this.id = id;
    this.color = color;
    this.model = model;
    this.location = location;
}

Bikes.prototype.toString = function (){
    return `id ${this.id} | color ${this.color}`
}

Bikes.allBikes = [];

Bikes.add = function (bike) {
    Bikes.allBikes.push(bike);
}

Bikes.find = function (id) {
    let bike = Bikes.allBikes.find((bike) => bike.id === id);
    if(bike) {
        return bike;
    }else{
        throw new Error("No existe una bicicleta por ese id");
    }
}

Bikes.remove = function (id) {
    let bikeId = Bikes.allBikes.findIndex((bike) => bike.id === id);
    if(bikeId !== undefined) {
        Bikes.allBikes.splice(bikeId, 1);
        return true;
    }else{
        throw new Error("No existe una bicicleta por ese id");
    }
}

let trinx = new Bikes(1, "red", "urban", [1,2]);
let gt = new Bikes(2, "red", "urban", [1,2]);

Bikes.add(trinx);
Bikes.add(gt);

module.exports = Bikes;