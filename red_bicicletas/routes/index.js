var express = require('express');
var router = express.Router();

const authController = require('../controllers/auth')

router.get('/', function(req, res) {
  res.render('index', { title: 'Express'});
});

router.get('/forgotPassword', function(req, res) {
  res.render('session/forgotPassword');
});

router.post('/forgotPassword', authController.forgotPasswordPost );
router.get('/resetPassword/:token', authController.resetPasswordGet );
router.post('/resetPassword', authController.resetPasswordPost );

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;
