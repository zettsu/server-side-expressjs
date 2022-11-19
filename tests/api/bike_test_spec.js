let Bikes = require('../../red_bicicletas/models/bikes');
let request = require('request');
let server = require('../../red_bicicletas/bin/www');
const headers = {'content-type':'application/json'};

const localhost = "http://localhost:3000/api/v1/"

afterEach(function() {});

describe('Bikes api', ()=>{
    describe('get /', ()=>{
        it('should return 200 OK', function (done) {
            expect(Bikes.findAll().length).toBe(0);
            Bikes.add(new Bikes(1, 'black', 'GT', 'MTB', [-34.00, -10.00]));
            expect(Bikes.findAll().length).toBe(1);
            request(`${localhost}bikes`, function (error, response, body){
                expect(JSON.parse(body).bikes.length).toBe(Bikes.findAll().length);
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('get by id /', ()=>{
        it('should return 200 OK', function (done) {
            expect(function() { Bikes.find(25) } ).toThrow(new Error("Bike not found for provided id."));
            Bikes.add(new Bikes(25, 'black', 'Kyoto', 'MTB', [-34.00, -10.00]));
            expect(Bikes.find(25).model).toBe('Kyoto');
            request(`${localhost}bikes/25`, function (error, response, body){
                expect(JSON.parse(body).model).toBe('Kyoto');
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('post /', ()=>{
        it('should return 200 OK', function (done) {
            let bike = JSON.stringify(new Bikes(1, 'black', 'GT', 'MTB', [-34.00, -10.00]));
            request.post({
                headers: headers,
                url:`${localhost}bikes`,
                body: bike
            },function (error, response, body){
                expect(JSON.parse(body).color).toBe("black");
                expect(response.statusCode).toBe(201);
                done();
            });
        });
    });

    describe('put /', ()=>{
        it('should return 200 OK', function (done) {
            let bike = new Bikes(99, 'black', 'GT', 'MTB', [-34.00, -10.00]);
            Bikes.add(bike);
            expect(Bikes.find(99).color).toEqual('black');
            bike.color = 'red';
            request.put({
                headers: headers,
                url:`${localhost}bikes/99`,
                body: JSON.stringify(bike)
            },function (error, response, body){
                expect(JSON.parse(body).color).toBe("red");
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('delete /', ()=>{
        it('should return 200 OK', function (done) {
            let bike = new Bikes(50, 'blue', 'GT', 'MTB', [-34.00, -10.00]);
            Bikes.add(bike);
            expect(Bikes.find(50).color).toEqual('blue');
            request.delete(`${localhost}bikes/50`,function (error, response, body){
                expect(response.statusCode).toBe(200);
                expect(function() { Bikes.find(50) } ).toThrow(new Error("Bike not found for provided id."));
                done();
            });
        });
    });

});
