let Bikes = require('../../red_bicicletas/models/bikes');
let mongoose = require('mongoose');

const mongodb = "mongodb://127.0.0.1/bikes";
const options = { useNewUrlParser:true };

// originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

function dummyBikeInstance(code) {
    return Bikes.createInstance(code, 'green', 'urban', [-34.00, -60.00]);
}

afterAll( async function() {
    await Bikes.deleteMany();
});

beforeEach(async function() {
    mongoose.connect(mongodb, options);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, "mongo db connection error"));
    db.once('open', function (){
        console.log('connected to mongo');

    });
    await Bikes.deleteMany();
});


describe('Tests bikes', function () {
    describe('Test instance', function () {
        it('instance returned', () =>{
            let bike = dummyBikeInstance(1);
            expect(bike.code).toBe(1);
            expect(bike.color).toBe('green');
            expect(bike.model).toBe('urban');
            expect(bike.location).toEqual([-34.00, -60.00]);
        });
    });
});

describe('Test find all', function () {
    it('equal to 0 instances returned', async () => {
        const results = await Bikes.findAll();
        expect(results.length).toBe(0);
    });

    it('more than 0 instances returned', async () => {
        await Bikes.insertMany(dummyBikeInstance(2));
        const results = await Bikes.findAll();
        expect(results.length).toBe(1);
        expect(results[0].model).toBe('urban');
    });
});

describe('Test add', function () {
    it('equal to 0 instances returned',   async () => {
       expect(await Bikes.findById(99)).toEqual([]);
    });

    it('more than 0 instances returned', async () => {
        await Bikes.insertMany(dummyBikeInstance(99));
        const results = await Bikes.findById(99);
        expect(results.length).toBe(1);
        expect(results[0].model).toBe('urban');
    });
});



/*


const dummyBike = new Bikes(99, "red", "GT", [-54.0, -45.00]);
const dummyBike2 = new Bikes(99, "blue", "TRINX", [-54.0, -45.00]);

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

 */