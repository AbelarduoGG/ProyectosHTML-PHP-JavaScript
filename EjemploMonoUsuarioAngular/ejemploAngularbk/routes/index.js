var express = require('express');
var router = express.Router();

// una funcion anonima es aquella que no tiene un nombre, no conoce nadie, se usa solo para hacer la funcion

/* GET home page. */
router.get('/', function(req, res, next) {    //request y response son dos metodos de peticion y respuesta entre cliente y servidor, el next es un tercer proceso en caso de errores
  res.render('index', { title: 'Express' });    //una funcion render para volver visible la vista index y mandamos la variable titulo con el valor Express
});

module.exports = router;
