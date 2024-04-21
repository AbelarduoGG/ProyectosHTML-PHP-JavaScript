var express = require('express');
const { request } = require('../app');
var router = express.Router();

const {check, validationResult} = require("express-validator");   // traemos nuestras librerias a las variables, luego de instalar el validation
const bcrypt = require ("bcrypt");    //declaramos la variable para nuestra libreria bcrypt para encriptar contrasenas
const mongoose = require("mongoose");   // traemos la libreria de mongoose
const autentifica = require("../middleware/autentificajwt");   //traemos el archivo de autetificajwt a la variable declarada
// traemos el modelo de datos o esquema, el cual reclamos en models/usuario (Usuario)
const Usuario = mongoose.model("Usuario");

// creamos los metodos para nuestro CRUD
// dos metodos iguales deben tener rutas distintas o solo se ejecutara el primero

// el metodo get es el unico metodo que se puede ejecutar desde el navegador, los demas solo en formulario
// el metodo get recibe informacion en la url. El post, al igual que el put, la recibe oculta

// delete recibe la informacion en url

/* GET users listing. */
// consultar todo
router.get('/', async function(req, res, next) {

  let usu = await Usuario.find({});
  res.send(usu);

  // res.send('Soy metodo get consulto informacion');    //manda el texto al archivo
});

// consultar un campo
router.get('/:usu', async(req,res)=>{  //debido a que es un get, bastara con poner /usuarios/saludo en la ruta de pagina para invocarlo
  
  let usu = await Usuario.findOne({usuario: req.params.usu});
  if(!usu){
    return res.status(402).send("Usuario no encontrado");
  }

  res.send({usu});

  // res.send('Hola Mundo')
});

// ponemos async para indicar que trabaje asincronamente con la bd

// guardar bd
// para hacer validacion agregamos corchetes y la variable check
router.post('/', [
  check('usuario').notEmpty().withMessage('El campo usuario esta vacio'),      // revisamos los campos que llegan al front (usuario y password). notEmpty para no vacio
  check('usuario').isEmail().withMessage("El campo usuario es un email no valido"),    //revisa que sea para correo (cadena, @, cadena, punto)
  check('password').isStrongPassword({minLength:8,      // realizamos validaciones al password
                                      minLowercase: 1,
                                      minNumbers: 1,
                                      minSymbols: 1,
                                      minUppercase: 1})
                                      .withMessage('El campo contrasena necesita 8 caracteres: ' +
                                      'una minuscula, una mayuscula, un simbolo, un numero.')
], async (req, res)=>{   //creamos nuestra funcion anonima, indicando primero la ruta y enseguida los parametros
  
  let error = validationResult(req);  // revisara el vaciado o llenado de datos en la variable req

  if(!error.isEmpty()){     // en caso de que no este vacio la variable de error
    return res.status(402).json({ errores : error.array() })  // en caso de estar vacio retornamos un json errores con la informacion de error en forma de arreglo   
  }

  let salt = await bcrypt.genSalt(10);     //llenamos la variable salt con el logaritmo de la libreria para encriptar, teniendo el algoritmo de encriptado
  let pass_cifrado = await bcrypt.hash(req.body.password, salt);   //el primer parametro en nuestro metodo hash es el elemento a encriptar y el segundo el algoritmo a utilizar

  // creamos nuestro objeto en base a nuestra plantilla en usuario.js de models
  let usu_guardado = new Usuario({
    usuario: req.body.usuario,     // el metodo post llega a traves de un body
    password: pass_cifrado

  });

  await usu_guardado.save();    // mandamos nuestro modelo para guardarlo en la bd

  res.status(201).send({usu_guardado})    //indicamos el retorno del objeto

  let nom = req.body.nombre    // guardamos la variable que se esta guardando, se encuentra en nuestro postman
  // res.send('Soy metodo post guardo de informacion, por ejemplo: ' +nom);

});

//inicio de sesion
router.post("/iniciosesion", [check('usuario').notEmpty().withMessage('El campo esta vacio'),      // revisamos los campos que llegan al front (usuario y password). notEmpty para no vacio
check('usuario').isEmail().withMessage("Email no valido"),    //revisa que sea para correo (cadena, @, cadena, punto)
check('password').isStrongPassword({minLength:8,      // realizamos validaciones al password
                                    minLowercase: 1,
                                    minNumbers: 1,
                                    minSymbols: 1,
                                    minUppercase: 1})
                                    .withMessage('El campo necesita 8 caracteres: ' +
                                    'una minuscula, una mayuscula, un simbolo, un numero.')
], async(req, res)=>{

  let error = validationResult(req);  // revisara el vaciado o llenado de datos en la variable req

  if(!error.isEmpty()){     // en caso de que no este vacio la variable de error
    return res.status(402).json({ errores : error.array() })  // en caso de estar vacio retornamos un json errores con la informacion de error en forma de arreglo   
  }

  let usu = await Usuario.findOne({usuario:req.body.usuario});    //llenamos la variable con los usuarios

  if(!usu){     //verificamos que exista dicho usuario
    return res.status(402).send('Usuario o contrasena incorrecta');
  }

  if(!await bcrypt.compare(req.body.password, usu.password)){     //desencriptamos la contrasena y la comparamos con la que coloco el usuario con el metodo compare
    return res.status(402).send('Usuario o contrasena incorrecta');
  }

  //mandamos un json como respuesta en lugar de su mismo correo
  let usu_enviar={
    email: usu.usuario,
    jwtoken: usu.generadorJWT(),    //mandamos el token que le generamos
    mensaje: 'Bienvenido al sistema'
  }
  
  res.send({usu_enviar});
  // res.send('Bienvenido, ' + usu.usuario);

});

// modificar bd
router.put('/', autentifica,[
  check('usuario').notEmpty().withMessage('El campo esta vacio'),      // revisamos los campos que llegan al front (usuario y password). notEmpty para no vacio
  check('usuario').isEmail().withMessage("Email no valido"),    //revisa que sea para correo (cadena, @, cadena, punto)
  check('password').isStrongPassword({minLength:8,      // realizamos validaciones al password
                                      minLowercase: 1,
                                      minNumbers: 1,
                                      minSymbols: 1,
                                      minUppercase: 1})
                                      .withMessage('El campo necesita 8 caracteres: ' +
                                      'una minuscula, una mayuscula, un simbolo, un numero.')
], async (req, res)=>{   //creamos nuestra funcion anonima, indicando primero la ruta y enseguida los parametros
  
  let error = validationResult(req);  // revisara el vaciado o llenado de datos en la variable req

  if(!error.isEmpty()){     // en caso de que no este vacio la variable de error
    return res.status(402).json({ errores : error.array() })  // en caso de estar vacio retornamos un json errores con la informacion de error en forma de arreglo   
  }

  // hacemos una consulta de los datos a eliminar
  let usu = await Usuario.findOne({usuario:req.body.usuario})   // si el usuario de peticion es identico se hace la peticion

  if(!usu){   //si retorna falso la variable trae informacion
    return res.status(402).send("Usuario no encontrado");   //return detiene toda la operacion
  }

  let salt = await bcrypt.genSalt(10);     //llenamos la variable salt con el logaritmo de la libreria para encriptar, teniendo el algoritmo de encriptado
  let pass_cifrado = await bcrypt.hash(req.body.password, salt);   //el primer parametro en nuestro metodo hash es el elemento a encriptar y el segundo el algoritmo a utilizar

  let usu_modificado = await Usuario.findOneAndUpdate(
    // campo de referencia
    {usuario:req.body.usuario},  //el metodo de busqueda
    // campo a actualizar
    {password: pass_cifrado}, //el campo de referencia NO se puede actualizar. el primero es el de actualizar, el segundo el que toma referencia
    // respuesta del metodo (documento modificado o documento antes de modificar)
    {new: true},   //false retorna el objeto antes de modificar, true despues
  );

  res.send({usu_modificado}); //mandamos el actualizado


  // res.send('Soy metodo put modifico informacion')
});

router.delete('/:nombre', async(req, res)=>{   // indicamos que la ruta raiz venga con un valor de referencia para eliminar
  let usu = await Usuario.findOne({usuario:req.params.nombre});

  if(!usu){
    return res.status(402).send("Usuario no encontrado");
  }

  let usu_eliminado = await Usuario.findOneAndDelete({usuario:req.params.nombre});
  
  res.send({usu_eliminado});
  
  // let nom = req.params.nombre;   // guardamos el nombre del usuario con el metodo request, el params indicando que viene en la url y que esta en la extension nombre
  // res.send('Soy metodo delete elimino informacion por ejemplo: ' + nom);    //indicamos el nombre que guardamos
  // res.send('Esta es una segunda forma de manejar la informacion sin una variable: ' + req.params.nombre);
});

module.exports = router;
