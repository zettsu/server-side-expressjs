let mongoose = require('mongoose');
let Booking = require('../models/booking');

let Schema = mongoose.Schema;

let usersSchema = new Schema({
    name: String,
});

usersSchema.methods.createBooking = function(bikeId, from, to, cb){
    const booking = new Booking({user:this._id, bike:bikeId, from:from, to:to});
    booking.save(cb);
}

usersSchema.statics.findAll = function(cb){
    return this.find({}, cb);
}

usersSchema.statics.findByUserId = function (id, cb) {
    return this.findById(id, cb);
}

usersSchema.statics.addUser = function(name, cb){
    return this.create({ name:name }, cb);
}

usersSchema.statics.updateUser = function (id, user, cb) {
    return this.findByIdAndUpdate(id, user, {new: true}, cb);
}

usersSchema.statics.removeById = function (id, cb) {
    return this.deleteOne({_id:id}, cb);
}

module.exports = mongoose.model("Users", usersSchema);
