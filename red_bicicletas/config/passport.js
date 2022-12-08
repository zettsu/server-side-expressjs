const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/users');

passport.use(new LocalStrategy({},
    function(username, password, done) {
        Users.findOne({ email: username }, function (err, user) {  if (err) {
            console.error('err:'+err)
            return done(err);
        }
            if (!user) {
                console.error('user not found')
                return done(null, false, { message: 'Username incorrecto.' });
            }
            if (!user.validPassword(password)) {
                console.error('invalid user')
                return done(null, false, { message: 'Password incorrecto.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user.id)
});

passport.deserializeUser(function (id, cb) {
    Users.findById(id, function (err, user) {
        cb(err, user);
    })
});

module.exports = passport;
