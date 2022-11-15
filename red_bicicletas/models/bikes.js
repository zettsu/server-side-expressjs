let Bikes = function (id, color, model, location) {
    this.id = id;
    this.color = color;
    this.model = model;
    this.location = location
}

Bikes.prototype.toString = function (){
    return `id ${this.id} | color ${this.color}`
}

Bikes.allBikes = [];

Bikes.add = function (bike) {
    Bikes.allBikes.push(bike);
}

Bikes.find = function (id) {
    let bike = Bikes.allBikes.find((bike) => bike.id.toString() === id);
    if(bike !== undefined) {
        return bike;
    }else{
        throw new Error("No existe una bicicleta por ese id");
    }
}

Bikes.update = function (id, color, model, location) {
    let bike = Bikes.allBikes.find((obj => obj.id.toString() === id));
    if(bike !== undefined) {
        bike.color = color;
        bike.model = model;
        bike.location = location;
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

let trinx = new Bikes(1, "red", "Trinx urban", [-34.935404,-56.160398]);
let gt = new Bikes(2, "blue", "GT Agressor MB", [-34.930813,-56.159797]);

Bikes.add(trinx);
Bikes.add(gt);

module.exports = Bikes;