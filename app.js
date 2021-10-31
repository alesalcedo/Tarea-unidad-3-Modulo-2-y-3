var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var session = require('express-session');


var indexRouter = require('./routes/index');
var conocenosRouter = require('./routes/conocenos');
var serviciosRouter = require('./routes/servicios');
var contactoRouter = require('./routes/contacto');
var informacionRouter = require('./routes/informacion');
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/novedades');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '12w45qe1qe4q1eq54eq5',
  resave: false,
  saveUninitialized: true
}))

secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login')
    }
  } catch (error) {
    console.log(error);
  }
}

app.use('/', indexRouter);
app.use('/conocenos', conocenosRouter);
app.use('/servicios', serviciosRouter);
app.use('/contacto', contactoRouter);
app.use('/informacion', informacionRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminRouter);

app.get('/sevicios', function (reg, res, next) {
});

app.get('/contacto', function (reg, res, next) {
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
