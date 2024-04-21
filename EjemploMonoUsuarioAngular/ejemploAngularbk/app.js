var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');      //traemos nuestra libreria de cors a una variable para usar el frontend

// traemos la libreria de moongose a nuestra variable, luego de instalar lo necesario en cmd
const mongoose = require('mongoose');

// hacemos la conexion a traves de un metodo, indicando la direccion de nuestro servicio. Luego de la diagonal de mongo.net agregamos el nombre de nuestra db
mongoose.connect("mongodb+srv://2122100566:Skylander123@cluster0.a5lwbjs.mongodb.net/Ejemplo5A?retryWrites=true&w=majority");

// lista de modelo de datos (Schema), lo cual es necesario para crear la base de datos  
require("./models/usuario");    // indicamos donde tenemos ese modelo

// lista de rutas (apirest)
// aqui indicamos a nuestro servidor los archivos a usar de routes. ruta para el metodo
var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//permitir configuracion con el frontend (el codigo de angular)
app.use(cors({
  "origin": "http://localhost:4200",    //indicamos la direccion de angular cuando esta activo
  "methods": "GET,PUT,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));


// indicamos la ruta para los archivos. en este caso el index es la raiz
app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);

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
