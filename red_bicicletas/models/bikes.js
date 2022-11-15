let Bikes = function (id, color, model, location) {
    this.id = id;
    this.color = color;
    this.model = model;
    this.location = location
}

Bikes.allBikes = [];

Bikes.add = function (bike) {
    Bikes.allBikes.push(bike);
}

Bikes.find = function (id) {
    let bike = Bikes.allBikes.find((bike) => bike.id.toString() === id.toString());
    if(bike === undefined) {
        throw new Error("No existe una bicicleta por ese id");
    }
    return bike;
}

Bikes.exists = function (id) {
    return Bikes.allBikes.find((bike) => bike.id.toString() === id.toString()) !== undefined;
}

Bikes.update = function (id, color, model, location) {
    let bike = Bikes.find(id);
    bike.color = color;
    bike.model = model;
    bike.location = location;
    return bike;
}

Bikes.remove = function (id) {
    let bikeId = Bikes.allBikes.findIndex((bike) => bike.id.toString() === id.toString());
    if(bikeId === -1) {
        throw new Error("No existe una bicicleta por ese id");
    }
    Bikes.allBikes.splice(bikeId, 1);
    return true;
}

let trinx = new Bikes("1", "red", "Trinx urban", [-34.935404,-56.160398]);
let gt = new Bikes("2", "blue", "GT Agressor MB", [-34.930813,-56.159797]);

Bikes.add(trinx);
Bikes.add(gt);

module.exports = Bikes;