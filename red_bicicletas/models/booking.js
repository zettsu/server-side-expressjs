let mongoose = require('mongoose');
let moment = require('moment');
let Schema = mongoose.Schema;

const REF_BIKE_MODEL = 'bike';
const REF_USER_MODEL = 'user';

let bookingSchema = new Schema({
    from: Date,
    to: Date,
    bike:{
        type:mongoose.Schema.Types.ObjectId, ref: 'Bikes'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, ref: 'Users'
    },
});

bookingSchema.methods.daysOfBooking = function () {
    return moment(this.from).diff(moment(this.to), 'days') + 1;
}

bookingSchema.statics.getAll = function (cb) {
    return this.find({}, cb);
}

bookingSchema.statics.removeById = function (id, cb) {
    return this.deleteOne({_id:id}, cb);
}

bookingSchema.statics.removeByUserIdAndBookingId = function (user, id, cb) {
    return this.deleteOne({_id:id, user: user}, cb);
}

bookingSchema.statics.findByUserId = function (user, cb) {
    return this.find({user: user}).populate(REF_BIKE_MODEL).populate(REF_USER_MODEL).exec(cb);
}

bookingSchema.statics.findByUserIdAndBookingId = function (user, bookingId, cb) {
    return this.findOne({_id: bookingId, user: user}).populate(REF_BIKE_MODEL).populate(REF_USER_MODEL).exec(cb);
}

bookingSchema.statics.findByBookingId = function (bookingId, cb) {
    return this.findOne({_id: bookingId}).populate(REF_BIKE_MODEL).populate(REF_USER_MODEL).exec(cb);
}

bookingSchema.statics.createBooking = function (booking, cb) {
    booking.to = moment(booking.to);
    booking.from = moment(booking.from);
    return this.create(booking, cb);
}

bookingSchema.statics.updateBooking = function (bookingId, booking, cb) {
    booking.to = moment(booking.to);
    booking.from = moment(booking.from);
    return this.findByIdAndUpdate(bookingId, booking, {new: true}, cb);
}

module.exports = mongoose.model("Booking", bookingSchema);
