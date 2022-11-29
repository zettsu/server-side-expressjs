let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bikesSchema = new Schema({
    code: Number,
    color: String,
    model: String,
    location: {
        type: [Number], index: { type: '2dsphere',sparse:true }
    }
});

bikesSchema.statics.createInstance = function (code, color, model, location){
    return new this({
        code: code,
        color: color,
        model: model,
        location: location
    });
};

bikesSchema.methods.toString = function (){
    return 'code' + this.code + ' color:'+ this.color;
};

bikesSchema.statics.findAll = function(){
    return this.find({});
}

bikesSchema.statics.findByCode = function (code, cb) {
    return this.findOne({ code : code}, cb);
}

bikesSchema.statics.addBike = function (bike, cb) {
    return this.create(bike, cb);
}

bikesSchema.statics.updateBike = function (code, bike) {
    return this.findOneAndUpdate( { code:code }, bike, { new : true });
}

bikesSchema.statics.removeByCode = function (code) {
    return this.deleteOne({code: code});
}

module.exports = mongoose.model("Bikes", bikesSchema);
