let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let Booking = require('../models/booking');

let Schema = mongoose.Schema;

const saltRounds = 10;

const validateEmail = function (email) {
    return "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/".test(email);
}

let usersSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "El email es obligatorio"]
    },
    email:{
        type: String,
        trim: true,
        required: [true, "El email es obligatorio"],
        lowercase: [validateEmail, "Por favor, ingrese un email valido"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: [true, "El password es obligatorio"]
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verified: {
        type: Boolean,
        default: false
    }
});

usersSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usersSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

usersSchema.methods.createBooking = function(bikeId, from, to, cb) {
    const booking = new Booking({user:this._id, bike:bikeId, from:from, to:to});
    booking.save(cb);
}

usersSchema.statics.findAll = function(cb) {
    return this.find({}, cb);
}

usersSchema.statics.findByUserId = function (id, cb) {
    return this.findById(id, cb);
}

usersSchema.statics.addUser = function(name, cb) {
    return this.create({ name:name }, cb);
}

usersSchema.statics.updateUser = function (id, user, cb) {
    return this.findByIdAndUpdate(id, user, {new: true}, cb);
}

usersSchema.statics.removeById = function (id, cb) {
    return this.deleteOne({_id:id}, cb);
}

module.exports = mongoose.model("Users", usersSchema);
