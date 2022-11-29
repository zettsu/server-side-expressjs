let Booking = require('../../red_bicicletas/models/booking');
let Bikes = require('../../red_bicicletas/models/bikes');
let Users = require('../../red_bicicletas/models/users');

let mongoHelper = require('../helpers/mongoHelpers');
let miscHelper = require('../helpers/miscHelper');

const TEST_BIKE = mongoHelper.dummyBikeInstance(999);

beforeEach(async function() {
    mongoHelper.connect();
    await Bikes.deleteMany();
    await Users.deleteMany();
    await Booking.deleteMany();
});

afterAll( async () => {
    await Bikes.deleteMany();
    await Users.deleteMany();
    await Booking.deleteMany();
});

describe('Get all', () => {
    it('Returned iterable', (done) => {
        Booking.getAll((err, res) => {
            expect(miscHelper.isIterable(res)).toBeTrue();
            expect(res.length).toBe(0);
            Users.addUser("TEST",(errorBooking, createdUser) => {
                Bikes.addBike(TEST_BIKE,(errorBooking, createdBike) => {
                    let booking = new Booking({user:createdUser,bike:createdBike,from:"2022-12-12",to:"2022-12-12"});
                    Booking.createBooking(booking, (err, res) => {
                        Booking.getAll((err, res) => {
                            expect(res.length>0).toBeTrue();
                            done();
                        });
                    });
                });
            });
        })
    });
});

describe('Create and Remove', () => {
    it('Create and remove booking', (done) => {
        Users.addUser("TEST",(errorBooking, createdUser) => {
            Bikes.addBike(TEST_BIKE,(errorBooking, createdBike) => {
                let booking = new Booking({user:createdUser,bike:createdBike,from:"2022-12-12",to:"2022-12-12"});
                Booking.createBooking(booking, (errorBooking, createdBooking) => {
                    Booking.findByBookingId(createdBooking.id, (errorGetBooking, findedBooking) => {
                        expect(findedBooking.id).toBe(createdBooking.id);
                        Booking.removeById(findedBooking._id, (removedError, removedBooking) => {
                            Booking.findByBookingId(createdBooking._id, (err, res) => {
                                expect(res).toBe(null);
                                done();
                            });
                        });
                    });
                });
            });
        });
    })
});

describe('Find Booking of user', () => {
    it('Returned iterable', (done) => {
        Users.addUser("TEST",(errorBooking, createdUser) => {
            Bikes.addBike(TEST_BIKE,(errorBooking, createdBike) => {
                let booking = new Booking({user:createdUser,bike:createdBike,from:"2022-12-12",to:"2022-12-12"});
                Booking.createBooking(booking, (errorBooking, createdBooking) => {
                    Booking.findByUserId(createdUser, (errorGetBooking, findedBooking) => {
                        expect(miscHelper.isIterable(findedBooking)).toBeTrue();
                        expect(findedBooking[0].user.id).toBe(createdUser.id)
                        done();
                    })
                })
            })
        })
    })
});
