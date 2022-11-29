const Bikes = require("../../red_bicicletas/models/bikes");
const Users = require("../../red_bicicletas/models/users");
const mongoose = require('mongoose')
const mongodb = "mongodb://127.0.0.1/bikes";
const options = { useNewUrlParser:true };

exports.connect = function (){
    mongoose.connect(mongodb, options);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, "mongo db connection error"));
    db.once('open', function (){
        console.log('connected to mongo');
    });
}

exports.dummyBikeInstance = function (code) {
    return Bikes.createInstance(code, 'green', 'urban', [-34.00, -60.00]);
}

exports.dummyUserInstance = function (name) {
    return new Users({name:name});
}