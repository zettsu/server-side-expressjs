let Bikes = require('../../red_bicicletas/models/bikes');
let mongoHelper = require('../helpers/mongoHelpers');

beforeEach(async function() {
    mongoHelper.connect()
    await Bikes.deleteMany();
});

afterAll( async function() {
    await Bikes.deleteMany();
});


describe('Test instance', function () {
    it('instance returned', () =>{
        let bike = mongoHelper.dummyBikeInstance(1);
        expect(bike.code).toBe(1);
        expect(bike.color).toBe('green');
        expect(bike.model).toBe('urban');
        expect(bike.location).toEqual([-34.00, -60.00]);
    });
});


describe('Find all bikes', function () {
    it('more than 0 instances returned', async () => {
        const allBikes = await Bikes.findAll();
        expect(allBikes.length).toBe(0);
        await Bikes.addBike(mongoHelper.dummyBikeInstance(2));
        const results = await Bikes.findAll();
        expect(results.length).toBe(1);
        expect(results[0].model).toBe('urban');
    });
});

describe('Add bike', function () {
    it('more than 0 instances returned', async () => {
        expect(await Bikes.findByCode(99)).toEqual(null);
        let bike = await Bikes.addBike(mongoHelper.dummyBikeInstance(99));
        const results = await Bikes.findByCode(99);
        expect(results.code).toBe(bike.code);
        expect(results.model).toBe('urban');
    });
});

describe('Remove bike', function () {
    it('more than 0 instances returned', async () => {
        expect(await Bikes.findByCode(120)).toEqual(null);
        await Bikes.addBike(mongoHelper.dummyBikeInstance(120));
        await Bikes.removeByCode(120);
        expect(await Bikes.findByCode(121)).toEqual(null);
    });
});


describe('Update bike', function () {
    it('Updated bike', async () => {
        expect(await Bikes.findByCode(99)).toEqual(null);
        const bikeAdd =await Bikes.addBike(mongoHelper.dummyBikeInstance(99));
        expect(bikeAdd.code).toBe(99);
        bikeAdd.color = "grey";
        await Bikes.updateBike(99, bikeAdd);
        let updatedBike = await Bikes.findByCode(99);
        expect(updatedBike.color !== bikeAdd.color);
    });
});
