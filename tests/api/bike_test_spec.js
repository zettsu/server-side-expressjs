let Bikes = require('../../red_bicicletas/models/bikes');
let request = require('request');
let server = require('../../red_bicicletas/bin/www');

let mongoHelper = require('../helpers/mongoHelpers');
let miscHelper = require('../helpers/miscHelper');
const {HTTP_OK} = require("../helpers/miscHelper");

const localhost = "http://127.0.0.1:3000/api/v1/"

const TEST_FIFTY_ID = 50;
const TEST_NINETYNINE_ID = 99;
const TEST_COLOR_BLUE = 'blue';
const TEST_COLOR_BLACK = 'black';
const TEST_COLOR_GREEN = 'green';
const TEST_COLOR_RED = 'red';
const TEST_MODEL_MTB = 'MTB';
const TEST_LOCATION = [-34.00, -10.00];


beforeEach(async function() {
    mongoHelper.connect()
    await Bikes.deleteMany();
});

afterAll( async function() {
    await Bikes.deleteMany();
});

describe('get /', () => {
    it('should return 200 OK', (done) => {
        expect(Bikes.findAll().length).toBe(undefined);
        Bikes.addBike(mongoHelper.dummyBikeInstance(1));
        request.get(`${localhost}bikes`,(error, response, body) => {
            const bikes = JSON.parse(body).bikes;
            expect(miscHelper.isIterable(bikes)).toBeTrue();
            expect(bikes.length).toBe(1);
            expect(response.statusCode).toBe(HTTP_OK);
            done();
        });
    });
});

describe('get by id /',() => {
    it('should return 200 OK',  (done) => {
        const bike = Bikes.createInstance(25, TEST_COLOR_GREEN, TEST_MODEL_MTB, TEST_LOCATION);
        Bikes.addBike(bike);
        request(`${localhost}bikes/25`,(error, response, body) => {
            const bike = JSON.parse(body);
            expect(bike.model).toBe(TEST_MODEL_MTB);
            expect(response.statusCode).toBe(HTTP_OK);
            done();
        });
    });
});

describe('post /', () => {
    it('should return 201 created',  (done) => {
        let bike = JSON.stringify(Bikes.createInstance(1, TEST_COLOR_BLACK, TEST_MODEL_MTB, TEST_LOCATION));
        request.post({
            headers: miscHelper.headers,
            url:`${localhost}bikes`,
            body: bike
        }, (error, response, body) => {
            expect(JSON.parse(body).color).toBe(TEST_COLOR_BLACK);
            expect(response.statusCode).toBe(201);
            done();
        });
    });
});


describe('put /', ()=>{
    it('should return 200 OK', (done) => {
        let bike = Bikes.createInstance(TEST_NINETYNINE_ID, TEST_COLOR_BLACK, TEST_MODEL_MTB, TEST_LOCATION);
        Bikes.addBike(bike);
        bike.color = TEST_COLOR_RED;
        request.put({
            headers: miscHelper.headers,
            url:`${localhost}bikes/99`,
            body: JSON.stringify(bike)
        }, (error, response, body) => {
            expect(JSON.parse(body).color).toBe(TEST_COLOR_RED);
            expect(response.statusCode).toBe(HTTP_OK);
            done();
        });
    });
});

describe('delete /', () => {
    it('should return 200 OK',  (done) => {
        let bike = Bikes.createInstance(TEST_FIFTY_ID, TEST_COLOR_BLUE, TEST_MODEL_MTB, TEST_LOCATION);
        Bikes.addBike(bike);
        request.delete(`${localhost}bikes/50`, (error, response) => {
            expect(response.statusCode).toBe(HTTP_OK);
            Bikes.findOne(bike.id,  (err, res) => {
                expect(res).toBe(undefined)
                done();
            });
        });
    });
});
