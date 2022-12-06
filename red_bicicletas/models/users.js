const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Mailer = require('../mailer/Mailer')

const Booking = require('../models/booking');
const Token = require('../models/token');

let Schema = mongoose.Schema;

const saltRounds = 10;

const validateEmail = function (email) {
    return "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*$/".test(email);
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
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*$/],
        unique: true
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

usersSchema.plugin(uniqueValidator, {
    message: "EL {PATH} yya existe con otro usuario"
})

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

usersSchema.methods.welcomeMail = function(cb) {
    const token = new Token({_userId:this._id, token:crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;

    token.save(function (err) {
        if (err){ return console.log(err.message)}

        const options = {
            from :'rickey.murphy5@ethereal.email',
            to: email_destination,
            subject: 'Verify account',
            text: 'Hi, please in order to verify your account please click here http://localhost:3000/token/confirmation/'+token.token
        }

        Mailer.smtp().sendMail(options, function (err) {
            if (err){ return console.log(err.message)}
            console.log("Email was sended "+ email_destination);
        });
    });
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
