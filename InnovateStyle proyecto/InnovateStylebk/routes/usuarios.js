var express = require('express');
var router = express.Router();
const {check, validationResult} = require("express-validator");        //libreria para validar camposs
const bcrypt = require ("bcrypt");    //declaramos la variable para nuestra libreria bcrypt para encriptar contrasenas
const autentifica = require("../middleware/autentificajwt");    //traemos nuestro creador de token 

const mongoose = require("mongoose");

const Usuario = mongoose.model("Usuario");

//inicio de sesion
router.post('/iniciosesion',[
  check("correo").notEmpty().withMessage("El campo correo no contiene datos."),
  check("correo").isEmail().withMessage("El campo correo no tiene la estructura habitual."),
  check("contrasena").notEmpty().isStrongPassword({minLength: 8,
                                              minLowercase:1,
                                              minNumbers: 1,
                                              minSymbols: 1,
                                              minUppercase:1}).withMessage("El campo contraseña debe tener: " +
                                              "mínimo 8 caracteres," +
                                              " mínimo 1 minuscula," +
                                              " mínimo 1 mayúscula," +
                                              " mínimo 1 símbolo" +
                                              " mínimo 1 número.")
], async (req,res)=>{

  let error = validationResult(req);

  if(!error.isEmpty()){
    return res.status(402).json({errores:error.array()});
  }

  const usu = await Usuario.findOne({correo:req.body.correo});


  if(!usu){
    return res.status(402).send("Correo o contraseña incorrectos.");
  }

  if(!await bcrypt.compare(req.body.contrasena, usu.contrasena)){
    return res.status(402).send("Correo o contraseña incorrectos.");
  }

  let usu_enviar={    //retornamos los datos deseados, entre ellos el token creado al iniciar sesion
    nombre:usu.nombre,
    apellidop:usu.apellidop,
    apellidom:usu.apellidom,
    direccion:usu.direccion,
    rol:usu.rol,
    imagen:usu.imagen,
    jwtoken: usu.generadorJWT(),
    mensaje: "Bienvenido al sistema."
  }

  res.send({usu_enviar});

});

//modificar contrasena
router.post('/cambiarcontrasena', autentifica,[
  check("correo").notEmpty().withMessage("El campo correo no contiene datos."),
  check("correo").isEmail().withMessage("El campo correo no tiene la estructura habitual."),
  check("contrasena").notEmpty().withMessage("El campo contrasena no contiene datos."),
  check("contrasena").isStrongPassword({minLength: 8,
                                              minLowercase:1,
                                              minNumbers: 1,
                                              minSymbols: 1,
                                              minUppercase:1}).withMessage("El campo contraseña debe tener: " +
                                              "mínimo 8 caracteres," +
                                              " mínimo 1 minuscula," +
                                              " mínimo 1 mayúscula," +
                                              " mínimo 1 símbolo" +
                                              " mínimo 1 número.")
], async (req,res)=>{

  let error = validationResult(req);

  if(!error.isEmpty()){
    return res.status(402).json({errores:error.array()});
  }

  let usu = await Usuario.findOne({correo:req.body.correo});

  if(!usu){
    return res.status(402).send("Correo incorrecto.");
  }

  let salt = await bcrypt.genSalt(10);    //declaramos variable para la encriptacion
  let pass_cifrado = await bcrypt.hash(req.body.contrasena, salt);

   
  if (req.user.correo !== req.body.correo) {     // Verificar si el correo electrónico usuporcionado coincide con el correo electrónico del usuario autenticado
    return res.status(402).send("Correo incorrecto.");
  }

     let usu_modificado = await Usuario.findOneAndUpdate(
       {correo:req.body.correo},     //campo de referencia
       {contrasena: pass_cifrado},     //campo que se actualiza
       {new:true}     //respuesta del metodo. Documento modificado o sin modificar
    );
  
    let usu_enviar={    //retornamos los datos deseados, entre ellos el token creado al iniciar sesion
      mensaje: "Cambios guardados."
    }
  
    res.send({usu_enviar});
  
 
  // res.send({usu_modificado});

});

//guardar nuevos usuarios
router.post('/',[
    check("nombre").notEmpty().withMessage("El campo nombre no contiene datos."),
    check("apellidop").notEmpty().withMessage("El campo apellido paterno no contiene datos."),
    check("apellidom").notEmpty().withMessage("El campo apellido materno no contiene datos."),
    check("correo").notEmpty().withMessage("El campo correo no contiene datos."),
    check("correo").isEmail().withMessage("El campo correo no tiene la estructura habitual."),
    check("contrasena").notEmpty().isStrongPassword({minLength: 8,
                                                    minLowercase:1,
                                                    minNumbers: 1,
                                                    minSymbols: 1,
                                                    minUppercase:1}).withMessage("El campo contraseña debe tener: " +
                                                    "mínimo 8 caracteres," +
                                                    " mínimo 1 minuscula," +
                                                    " mínimo 1 mayúscula," +
                                                    " mínimo 1 símbolo" +
                                                    " mínimo 1 número."),
    check("direccion").notEmpty().withMessage("El campo dirección no contiene datos."),
    check("imagen").notEmpty().withMessage("El campo imagen no contiene datos."),
    check("rol").notEmpty().withMessage("El campo rol no contiene datos.")
  ],async (req,res)=>{

    let error = validationResult(req);

    if(!error.isEmpty()){
      return res.status(402).json({errores:error.array()});
    }

    let salt = await bcrypt.genSalt(10);    //declaramos variable para la encriptacion
    let pass_cifrado = await bcrypt.hash(req.body.contrasena, salt);

  let usu_guardado = new Usuario(
    {
    nombre:req.body.nombre,
    apellidop:req.body.apellidop,
    apellidom:req.body.apellidom,
    correo:req.body.correo,
    contrasena:pass_cifrado,
    direccion:req.body.direccion,
    imagen:req.body.imagen,
    rol:req.body.rol,
    estado:"Activo"
    }
  );  //guardamos los datos enviados

  await usu_guardado.save();    //mandamos la informacion a la base de datos
  // res.send({usu_guardado});     //retornamos los datos almacenados

  let usu_enviar={    //retornamos los datos deseados, entre ellos el token creado al iniciar sesion
    mensaje: "Usuario guardado."
  }

  res.send({usu_enviar});

});

// //eliminar usuarios
// router.post('/eliminar', [
//   check("correo").notEmpty().withMessage("El campo correo no contiene datos."),
//   check("correo").isEmail().withMessage("El campo correo no tiene la estructura habitual.")
// ], async (req,res)=>{


//   let error = validationResult(req);

//   if(!error.isEmpty()){
//     return res.status(402).json({errores:error.array()});
//   }

//   let usu = await Usuario.findOne({correo:req.body.correo});

//   if(!usu){
//     return res.status(402).send("Correo incorrecto.");
//   }
  
//   // let usu = await Usuario.findOne({correo:req.params.correo});

//   let usu_eliminado = await Usuario.findOneAndDelete({correo:req.body.correo});

//   let usu_enviar={ 
//     mensaje: "Usuario eliminado."
//   }

//   res.send({usu_enviar});

//   // res.send({usu_eliminado}); 
  
// });

//dar de baja usuarios
router.post('/eliminar', [
  check("correo").notEmpty().withMessage("El campo correo no contiene datos."),
  check("correo").isEmail().withMessage("El campo correo no tiene la estructura habitual.")
], async (req,res)=>{


  let error = validationResult(req);

  if(!error.isEmpty()){
    return res.status(402).json({errores:error.array()});
  }

  let usu = await Usuario.findOne({correo:req.body.correo});

  if(!usu){
    return res.status(402).send("Correo incorrecto.");
  }
  
  // let usu = await Usuario.findOne({correo:req.params.correo});

  let usu_modificado = await Usuario.findOneAndUpdate(
    {correo:req.body.correo},     //campo de referencia
    {estado: "Inactivo"},     //campo que se actualiza
    {new:true}     //respuesta del metodo. Documento modificado o sin modificar
  );

  let usu_enviar={    //retornamos los datos deseados, entre ellos el token creado al iniciar sesion
    mensaje: "Usuario eliminado."
  }

 res.send({usu_enviar});

  // res.send({usu_eliminado}); 
  
});

//consultar todo
router.get('/consultartodo', async function(req, res, next){

  let usuarios = await Usuario.find({});
  res.status(200).json({usuarios: usuarios});

});

//consultar un usuario
router.post('/consultar', [
  check("correo").notEmpty().withMessage("El campo correo no contiene datos.")
], async(req,res)=>{

  let error = validationResult(req);

  if(!error.isEmpty()){
    return res.status(402).json({errores:error.array()});
  }

  let usu = await Usuario.findOne({correo: req.body.correo});

  if(!usu){
    return res.status(402).send("Correo incorrecto.");
  }

  let usu_enviar={
    mensaje:"Nombre(s): " + usu.nombre +  "\n" +
    "Apellido paterno: " + usu.apellidop +  "\n" +
    "Apellido materno: " + usu.apellidom +  "\n" +
    "Correo: " + usu.correo +  "\n" +
    "Dirección: " + usu.direccion +  "\n" +
    "Rol: " + usu.rol + "\n" +
    "Estado: " + usu.estado 
 }

  res.send({usu_enviar});

});


module.exports = router;
