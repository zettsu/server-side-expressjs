let Users = require('../../red_bicicletas/models/users');
let Bikes = require('../../red_bicicletas/models/bikes');
let request = require('request');
let server = require('../../red_bicicletas/bin/www');
const headers = {'content-type':'application/json'};
const mongoHelper = require("../helpers/mongoHelpers");
const miscHelper = require("../helpers/miscHelper");
const Booking = require("../../red_bicicletas/models/booking");

const localhost = "http://127.0.0.1:3000/api/v1/"

const TEST_BIKE = mongoHelper.dummyBikeInstance(999);

beforeEach(async function() {
    mongoHelper.connect()
    await Bikes.deleteMany();
});

afterAll( async function() {
    await Bikes.deleteMany();
});

afterEach(function() {});

describe('get users /', () => {
    it('should return 200 OK',  function (done) {
        Users.addUser("test", function (err, user) {
            expect(user.name).toBe("test");
            request(`${localhost}users`, function (error, response, body){
                const users = JSON.parse(body).users;
                expect(miscHelper.isIterable(users)).toBeTrue();
                expect(response.statusCode).toBe(200);
                done();
            });
        })
    });
});

describe('get user /', () => {
    it('should return 200 OK',  function (done) {
        Users.addUser("test", function (err, user) {
            expect(user.name).toBe("test");
            request(`${localhost}users/${user._id}`, function (error, response, body){
                const userReturned = JSON.parse(body);
                expect(userReturned._id).toBe(user._id.toString());
                expect(response.statusCode).toBe(200);
                done();
            });
        })
    });
});

describe('get user booking /', () => {
    it('should return 200 OK',  function (done) {
        Users.addUser("TEST",(errorBooking, createdUser) => {
            Bikes.addBike(TEST_BIKE,(errorBooking, createdBike) => {
                let booking = new Booking({user:createdUser,bike:createdBike,from:"2022-12-12",to:"2022-12-12"});
                Booking.createBooking(booking, (errorBooking, createdBooking) => {
                    request(`${localhost}users/${createdUser._id}/bookings/${createdBooking._id}`, function (error, response, body){
                        const booking = JSON.parse(body);
                        expect(booking._id).toBe(createdBooking._id.toString());
                        expect(response.statusCode).toBe(200);
                        done();
                    });
                });
            });
        })
    });
});

describe('get user bookings /', () => {
    it('should return 200 OK',  function (done) {
        Users.addUser("TEST",(errorBooking, createdUser) => {
            Bikes.addBike(TEST_BIKE,(errorBooking, createdBike) => {
                let booking = new Booking({user:createdUser,bike:createdBike,from:"2022-12-12",to:"2022-12-12"});
                Booking.createBooking(booking, (errorBooking, createdBooking) => {
                    request(`${localhost}users/${createdUser._id}/bookings`, function (error, response, body){
                        const bookings = JSON.parse(body);
                        expect(miscHelper.isIterable(bookings)).toBeTrue();
                        expect(response.statusCode).toBe(200);
                        done();
                    });
                });
            });
        })
    });
});

describe('post /', () => {
    it('should return 201 OK', function (done) {
        request.post({
            headers: headers,
            url:`${localhost}users`,
            body:  JSON.stringify({name:"test"})
        },function (error, response, body){
            expect(JSON.parse(body).name).toBe("test");
            expect(response.statusCode).toBe(201);
            done();
        });
    });
});

describe('put /', () => {
    it('should return 200 OK', function (done) {
        Users.addUser("test", function (err, user) {
            request.put({
                headers: headers,
                url:`${localhost}users/${user.id}`,
                body: JSON.stringify({name:"testmodified"})
            },function (error, response, body){
                expect(JSON.parse(body).name).toBe("testmodified");
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});

describe('delete /', ()=>{
    it('should return 200 OK', function (done) {
        Users.addUser("test", function (err, res) {
            request.delete(`${localhost}users/${res.id}`,function (error, response, body){
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});

describe('get user bookings /', () => {
    it('should return 200 OK',  function (done) {
        Users.addUser("TEST",(errorBooking, createdUser) => {
            Bikes.addBike(TEST_BIKE,(errorBooking, createdBike) => {
                let booking = new Booking({user:createdUser,bike:createdBike,from:"2022-12-12",to:"2022-12-12"});
                Booking.createBooking(booking, (errorBooking, createdBooking) => {
                    request.delete(`${localhost}users/${createdUser._id}/bookings/${createdBooking._id}`, function (error, response, body){
                        expect(response.statusCode).toBe(200);
                        done();
                    });
                });
            });
        })
    });
});
