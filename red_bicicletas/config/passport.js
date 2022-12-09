const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/users');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-fa-oauth20').Strategy;

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

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.HOST + "/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        Users.findOrCreateByFacebook({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
    },
    function(accessToken, refreshToken, profile, cb) {
        Users.findOrCreateByGoogle({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
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
