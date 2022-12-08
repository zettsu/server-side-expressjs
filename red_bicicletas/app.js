var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('../red_bicicletas/config/passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');
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
const authApiRouter = require('./routes/api/auth');
const {maxAge} = require("express-session/session/cookie");

var app = express();

app.use(session({
  secret: 'bikes_!!!***!"!-!"',
  store:store,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 240 * 60 * 60 * 1000,
  },
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
app.use(cookieParser('secret'));
app.use(passport.initialize());
app.use(passport.session(({ secret: 'secret' })));
app.use(express.static(path.join(__dirname, 'public')));
app.set('secret-key', 'text');

app.use('/', indexRouter);

app.post('/login',  (req, res, next) => {
  return passport.authenticate('local', {}, (err, passportUser, info) => {
    console.error(err);

    if(passportUser) {
      return res.redirect('/');
    }

    return res.render('session/login', { user: {}, info:info });
  })(req, res, next);
});

function loggedIn(req, res, next) {
  if (req.user){
    next();
  }else{
    res.redirect('/login')
  }
}

function validateJwt(req, res, next)
{
  jwt.verify(req.headers['x-access-token'],req.app.get('secret-key'), function (err, decoded) {
    if(err) {
      res.json({status:"error", message:err.message, data:null})
    }else{
      req.body.userId = decoded.id;
      console.log("jwt verify: "+decoded)
      next();
    }
  })
}

app.get('/logout', function (req, res) {
  res.redirect('/');
});

app.use('/users', usersRouter);
app.use('/bikes', loggedIn, bikesRouter);
app.use('/token', tokenRouter);
app.use('/api/v1/', authApiRouter);
app.use('/api/v1/users', validateJwt, usersApiRouter);
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
