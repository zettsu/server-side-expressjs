var express = require('express');
var router = express.Router();
const passport = require('../config/passport');

const authController = require('../controllers/auth')

router.get('/', function(req, res) {
  res.render('index', { title: 'Bikers network'});
});

router.get('/forgotPassword', function(req, res) {
  res.render('session/forgotPassword');
});

router.post('/forgotPassword', authController.forgotPasswordPost );
router.get('/resetPassword/:token', authController.resetPasswordGet );
router.post('/resetPassword', authController.resetPasswordPost );
router.post('/facebook_token', passport.authenticate('facebook-token'), authController.authFacebookToken );

router.get('/login', function (req, res) {
  res.render('session/login')
});

router.get('/privacy_policy', function (req, res) {
  res.sendFile('public/privacy.html')
});

router.get('/tyc', function (req, res) {
  res.sendFile('public/tyc.html')
});

module.exports = router;
