let express = require("express")
let router = express.Router();

let usersApiController = require('../../controllers/api/users');

router.get('/', usersApiController.get);
router.get('/:id', usersApiController.getById);
router.post('/', usersApiController.createUser);
router.put('/:id', usersApiController.updateUser);
router.delete('/:id', usersApiController.deleteUser);

//Bookings from one user
router.get('/:id/bookings', usersApiController.getBookings);
router.get('/:id/bookings/:bookingsId', usersApiController.getBookingById);
router.post('/:id/bookings', usersApiController.createUserBooking);
router.put('/:id/bookings/:bookingsId', usersApiController.updateUserBooking);
router.delete('/:id/bookings/:bookingsId', usersApiController.deleteUserBooking);

module.exports = router;