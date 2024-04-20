var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');     //traemos la variable para usar cors y hacer la conexion con el frontend

const mongoose = require('mongoose');      //traemos la variable para usar el mongoose

                  //mongodb+srv://<username>:<password>@cluster0.etb7qck.mongodb.net/
mongoose.connect("mongodb+srv://2122100566:Skylander123@cluster0.etb7qck.mongodb.net/InnovationStyle?retryWrites=true&w=majority");  //hacemos la conexion a la base de datos
// mongoose.connect("mongodb+srv://2122100566:Skylander123@cluster0.a5lwbjs.mongodb.net/InnovaionStyle?retryWrites=true&w=majority");  //hacemos la conexion a la base de datos


//lista de modelos de datos (Schema)
require('./models/usuario');  //traemos nuestro modelo
require('./models/inventario'); 
require('./models/arduino'); 
require('./models/sensor2'); 

//lista rutas api rest
var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var inventariosRouter = require('./routes/inventarios');
var arduinosRouter = require('./routes/arduinos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({      //permite configuracion con el frontend (angular)
  "origin": "http://localhost:4200",    //direccion de angular
  "methods": "GET, PUT, POST, DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

//lista de url para el apirest
app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/inventarios', inventariosRouter);
app.use('/arduinos', arduinosRouter);

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
