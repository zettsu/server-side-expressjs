let Bikes = require('../../red_bicicletas/models/bikes');

const dummyBike = new Bikes(99, "red", "GT", [-54.0, -45.00]);
const dummyBike2 = new Bikes(99, "blue", "TRINX", [-54.0, -45.00]);

beforeEach(function() {
    Bikes.all.splice(0,Bikes.getLength())
});

afterEach(function() {});

describe('Bikes.allBikes', ()=>{
    it('start empty', () =>{
        Bikes.add(dummyBike);
        Bikes.add(dummyBike2);
        expect(Bikes.getLength()).toBe(2);
    });
});

describe('Bikes.add', ()=> {
    it('add one bike', () => {
        let expected = Bikes.getLength() + 1;
        Bikes.add(dummyBike);
        expect(Bikes.getLength()).toBe(expected);
    });
});

describe('Bikes.findBy', ()=> {
    it('Find bike by id', () => {
        Bikes.add(dummyBike);
        let bike = Bikes.find(dummyBike.id);
        expect(bike).toEqual(dummyBike);
    });
});

describe('Bikes.findAll', ()=> {
    it('Find all bikes', () => {
        const min = 1;
        const max = 10;
        const random = Math.floor(Math.random() * (max - min + 1) + min);

        for (let i = 0; i < random; i++) {
            Bikes.add(new Bikes(i, "blue", "TRINX", [-54.0, -45.00]));
        }

        expect(Bikes.findAll().length).toEqual(random);
    });
});

describe('Bikes.update', ()=> {
    it('Update bike instance', () => {
        Bikes.add(dummyBike);
        let bikeUpdate = Bikes.update(dummyBike.id, dummyBike2.color, dummyBike2.model, dummyBike2.location);
        expect(bikeUpdate).toEqual(dummyBike2);
    });
});

describe('Bikes.remove', ()=> {
    it('Remove by id', () => {
        Bikes.add(dummyBike);
        let expected = Bikes.getLength() - 1;
        Bikes.remove(dummyBike.id);
        expect(Bikes.getLength()).toEqual(expected);
    });
});

describe('Bikes.exists', ()=> {
    it('Exists bike', () => {
        Bikes.add(dummyBike);
        expect(Bikes.exists(dummyBike.id)).toBe(true);
    });
});

describe('Bikes.getLength', ()=> {
    it('getLength of bikes', () => {
        Bikes.add(dummyBike);
        expect(Bikes.getLength()).toBe(1);
    });
});
