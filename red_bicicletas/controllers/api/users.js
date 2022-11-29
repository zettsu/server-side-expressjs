let Users = require("../../models/users");
let Bikes = require("../../models/bikes");
let Booking = require("../../models/booking");

const {json} = require("express");
const moment = require("moment/moment");

exports.get = async function (req, res) {
    res.json({ users : await Users.findAll({}) });
}

exports.getById = function (req, res) {
    try {
        Users.findByUserId(req.params.id, function (error, user) {
            if (error) {
                return res.status(500).json({message: error.message});
            }
            if (user == null) {
                return res.status(404).json({message: "Not found"});
            }
            return res.json(user);
        });
    }catch (e){
        return res.status(404).json({message: e.message});
    }
}

exports.getBookings = function (req, res) {
    Booking.findByUserId(req.params.id, function (err, result) {
        return res.json(result);
    });
}

exports.getBookingById = function (req, res) {
    Users.findByUserId(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        Booking.findByUserIdAndBookingId(user, req.params.bookingsId, function (errBooking, booking) {
            if (err) {
                return res.status(500).json({message: err.message});
            }
            if (booking == null) {
                return res.status(404).json({message: "Not found"});
            }
            return res.json(booking);
        })
    });
}

exports.createUser = function (req, res) {
    Users.addUser(req.body.name, function (err, user) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        return res.status(201).json(user);
    });
}

exports.updateUser = function (req, res) {
    Users.updateUser(req.params.id, {name:req.body.name}, function (err, updatedUser) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        return res.json(updatedUser);
    });
}

exports.deleteUser = function (req, res) {
    Users.removeById(req.params.id, function (err, result) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        if (result.deletedCount) {
            return res.json();
        }
        return res.status(404).json({message: "Not Found"});
    });
}

exports.deleteUserBooking = function (req, res) {
    Users.findByUserId(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        if (user == null) {
            return res.status(404).json({message: "Not found"});
        }
        Booking.removeByUserIdAndBookingId(user, req.params.bookingsId, function (err, result) {
            if (err) {
                return res.status(500).json({message: err.message});
            }
            if (result.deletedCount) {
                return res.json();
            }
            return res.status(404).json({message: "Not Found"});
        });
    });
}

exports.updateUserBooking = function (req, res) {
    Users.findByUserId(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        if (user == null) {
            return res.status(404).json({message: "Not found"});
        }
        Booking.findByUserIdAndBookingId(user, req.params.bookingsId,async function (errBooking, booking) {
            if (errBooking) {
                return res.status(500).json({message: err.message});
            }
            if (booking == null) {
                return res.status(404).json({message: "Not found"});
            }

            if(req.body.bikeCode !== booking.bike.code) {
                let updatedBike = await Bikes.findByCode(req.body.bikeCode);
                if (updatedBike == null) {
                    return res.status(404).json({message: "Not found"});
                }
                booking.bike = updatedBike;
            }

            if (moment(req.body.from) !== booking.from) {
                booking.from = req.body.from;
            }

            if (moment(req.body.to) !== booking.to) {
                booking.to = req.body.to;
            }
            Booking.updateBooking(booking._id, booking, function (errUpdate, updatedBooking) {
                if (errUpdate) {
                    return res.status(500).json({message: errUpdate.message});
                }
                return res.json(updatedBooking);
            })
        })
    });
}

exports.createUserBooking = function (req, res) {
    Users.findByUserId(req.params.id, function (err, user) {
        Bikes.findByCode(req.body.bikeCode, function (err, bike) {
            Booking.createBooking(new Booking({user:user,bike:bike,from:req.body.from,to:req.body.to}), function (err, booking) {
                return res.status(201).json(booking);
            })
        });
    });
}
