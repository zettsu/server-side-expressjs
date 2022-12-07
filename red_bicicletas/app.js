var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('../config/passport');
const session = require('express-session');
const store = new session.MemoryStore;

//custom
const mongoose = require('mongoose');
const mongodb = "mongodb://127.0.0.1/red_bicicletas";

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bikesRouter = require('./routes/bikes');
const tokenRouter = require('./routes/token');
const bikesApiRouter = require('./routes/api/bikes');
const usersApiRouter = require('./routes/api/users');
const {maxAge} = require("express-session/session/cookie");

var app = express();

app.use(session({
  cookie:{
    maxAge: 240 * 60 * 60 * 1000,
    store:store,
    saveUninitialized:true,
    resave:'true',
    secret:'bikes_!!!***!"!-!"'
  }
}));



//db
mongoose.connect(mongodb, {useNewUrlParser:true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, "mongo db connection error"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));
app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        // Si llega a ejecutarse esta función, la autenticación fue exitosa.
        // `req.user` contiene el usuario autenticado.
      res.redirect('/users/' + req.user.username);
    });

app.post('/login', passport.authenticate('local', { successRedirect: '/',  failureRedirect: '/login' }));

app.use('/users', usersRouter);
app.use('/bikes', bikesRouter);
app.use('/token', tokenRouter);
app.use('/api/v1/users', usersApiRouter);
app.use('/api/v1/bikes', bikesApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
