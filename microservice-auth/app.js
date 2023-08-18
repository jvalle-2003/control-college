require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var app = express();
var bodyParser=require("body-parser");

// ########################## PARA TRADUCCIONES ############################# 
const message = require('./config/i18n/messages');
const i18nCreate = require('express-rest-i18n');
const i18n = i18nCreate({
  defaultLocale: 'en',
  warn: false, // optional
  allowFallback: true, // optional
  messages: message,
});
// ######################################################################### 

// view engine setup
// buscará en app/app/views/lugar de app/views/porque __dirname__dirnamees el directorio en el que reside el script que se está ejecutando actualmente.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//CONFIGURACIONS
app.use(logger('dev'));
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.middleware);


// ####################### ROUTES ################################
var indexRouter = require('./src/routes/index.route');

app.use('/', indexRouter);
// ################################################################

// ########################## EERORES ############################# 
// captura 404 y reenvía al controlador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// controlador de errores
app.use(function(err, req, res, next) {
  // establecer locales, solo proporcionando error en el desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // renderizar la página de error
  res.status(err.status || 500);
  res.render('error');
});
// ################################################################ 

module.exports = app;