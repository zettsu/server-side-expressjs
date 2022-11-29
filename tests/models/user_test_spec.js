let Bikes = require('../../red_bicicletas/models/bikes');
let Users = require('../../red_bicicletas/models/users');
let Booking = require('../../red_bicicletas/models/booking');

const helper = require('../helpers/mongoHelpers');

const REF_BIKE_MODEL = 'bike';
const REF_USER_MODEL = 'user';

const TEST_NAME = 'test';
const TEST_NAME_1 = 'test1';
const TEST_URBAN = 'urban';

beforeEach(async function() {
    helper.connect();
    await Bikes.deleteMany();
    await Booking.deleteMany();
    await Users.deleteMany();
});

afterAll( async function() {
    await Bikes.deleteMany();
    await Users.deleteMany();
    await Booking.deleteMany();
});

describe('Find All Users', function () {
    it('Users returned',  (done) => {
        Users.findAll((e, users) => {
            expect(users.length).toBe(0)
            Users.addUser(new Users({ name : TEST_NAME_1 }), (err, user) => {
                Users.findAll((e, users) => {
                    expect(users.length).toBe(1)
                    done();
                })
            });
        });
    });
});

describe('Find one User', function () {
    it('User returned',  (done) => {
        Users.addUser(new Users({ name : TEST_NAME_1}), (err, createdUser) => {
            Users.findByUserId(createdUser.id, (e, user) => {
                expect(user.id).toEqual(createdUser.id)
                expect(user.name).toEqual(createdUser.name)
                done();
            })
        });
    });
});

describe('Update User', function () {
    it('User modified returned',  (done) => {
        Users.addUser(new Users({ name : TEST_NAME}), (err, createdUser) => {
            Users.findByUserId(createdUser._id, (e, user) => {
                expect(user.name).toBe(createdUser.name)
                Users.updateUser(createdUser._id, { name : TEST_NAME_1 }, (err, modifiedUser) => {
                    expect(modifiedUser.name).toBe(TEST_NAME_1)
                    done();
                });
            })
        });
    });
});

describe('Create Booking', function () {
    it('Booking returned', (done) => {
        let user = new Users({ name : TEST_NAME });
        user.save()
        let bike = helper.dummyBikeInstance(1);
        bike.save()
        user.createBooking(bike.id, new Date(), new Date(), (err, booking) => {
            Booking.findOne({id: booking.id}).populate(REF_BIKE_MODEL).populate(REF_USER_MODEL).exec( (error, result) => {
                expect(result.user.name).toEqual(TEST_NAME)
                expect(result.bike.model).toBe(TEST_URBAN)
                done();
            });
        })
    });
});
