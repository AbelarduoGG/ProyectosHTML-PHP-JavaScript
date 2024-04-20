var express = require('express');
var router = express.Router();
const {check, validationResult} = require("express-validator");        //libreria para validar campos

const mongoose = require("mongoose");

const Producto = mongoose.model("Producto");

//agregar nuevos productos
router.post('/', [
    check("proveedor_id").notEmpty().withMessage("El campo ID proveedor no contiene datos."),
    check("nombre").notEmpty().withMessage("El campo nombre no contiene datos."),
    check("descripcion").notEmpty().withMessage("El campo descripción no contiene datos."),
    check("precio").notEmpty().withMessage("El campo precio no contiene datos."),
    check("cantidad").notEmpty().withMessage("El campo cantidad no contiene datos."),
    check("imagen1").notEmpty().withMessage("El campo de imagen 1 no contiene datos."),

    check("categoria").notEmpty().withMessage("El campo de categoria no contiene datos."),
    check("marca").notEmpty().withMessage("El campo de marca no contiene datos.")

],async (req,res)=>{

    let error = validationResult(req);

    if(!error.isEmpty()){
      return res.status(402).json({errores:error.array()});
    }

    let pro_guardado = new Producto(
        {
            proveedor_id:req.body.proveedor_id,
            nombre:req.body.nombre,
            descripcion:req.body.descripcion,
            precio:req.body.precio,
            cantidad:req.body.cantidad,
            imagen1:req.body.imagen1,

            categoria:req.body.categoria,
            estado:"Activo",
            marca:req.body.marca
        }
    );      //guardamos los datos enviados

    await pro_guardado.save();      //mandamos a la bd

    let pro_enviar={
        mensaje: "Producto almacenado."
    }

    res.send({pro_enviar});

});

//modificar producto
router.post('/modificarproducto', [
  check("nombre").notEmpty().withMessage("El campo nombre no contiene datos."),
  check("precio").notEmpty().withMessage("El campo precio no contiene datos."),
  check("cantidad").notEmpty().withMessage("El campo cantidad no contiene datos.")
], async (req,res)=>{

  let error = validationResult(req);

  if(!error.isEmpty()){
    return res.status(402).json({errores:error.array()});
  }

  let pro = await Producto.findOne({nombre:req.body.nombre});

  if(!pro){
    return res.status(402).send("Nombre incorrecto.");
  }

     let pro_modificadoprecio = await Producto.findOneAndUpdate(
       {nombre:req.body.nombre},     //campo de referencia
       {precio:req.body.precio},     //campo que se actualiza
       {new:true}     //respuesta del metodo. Documento modificado o sin modificar
    );

    let pro_modificadocantidad = await Producto.findOneAndUpdate(
      {nombre:req.body.nombre},     //campo de referencia
      {cantidad:req.body.cantidad},     //campo que se actualiza
      {new:true}     //respuesta del metodo. Documento modificado o sin modificar
   );
  
    let pro_enviar={    //retornamos los datos deseados, entre ellos el token creado al iniciar sesion
      mensaje: "Cambios guardados."
    }
  
    res.send({pro_enviar});
  
});

// //eliminar Producto
// router.delete('/:nombre', async (req,res)=>{
//     let pro = await Producto.findOne({nombre:req.params.nombre});

//     if(!pro){
//         return res.status(402).send("Producto incorrecto.");
//     }

//     let pro_eliminado = await Producto.findOneAndDelete({nombre:req.params.nombre});

//     res.send({pro_eliminado});
    
// });

//dar de baja productos
router.post('/eliminar', [
    check("nombre").notEmpty().withMessage("El campo nombre no contiene datos.")
  ], async (req,res)=>{
  
  
    let error = validationResult(req);
  
    if(!error.isEmpty()){
      return res.status(402).json({errores:error.array()});
    }
  
    let pro = await Producto.findOne({nombre:req.body.nombre});
  
    if(!pro){
      return res.status(402).send("Nombre incorrecto.");
    }
    
    // let pro = await Producto.findOne({nombre:req.params.nombre});
  
    let pro_modificado = await Producto.findOneAndUpdate(
      {nombre:req.body.nombre},     //campo de referencia
      {estado: "Inactivo"},     //campo que se actualiza
      {new:true}     //respuesta del metodo. Documento modificado o sin modificar
    );
  
    let pro_enviar={    //retornamos los datos deseados, entre ellos el token creado al iniciar sesion
      mensaje: "Producto eliminado."
    }
  
   res.send({pro_enviar});
  
    // res.send({pro_eliminado}); 
    
  });


//consultar todo
router.get('/consultartodo', async function(req,res, next) {

    let productos = await Producto.find({});
    res.status(200).json({ productos: productos });

});

//consultar un Producto
router.post('/consultar',[
    check("nombre").notEmpty().withMessage("El campo nombre no contiene datos.")
], async(req,res)=>{

    let error = validationResult(req);
  
    if(!error.isEmpty()){
      return res.status(402).json({errores:error.array()});
    }

    let pro = await Producto.findOne({nombre:req.body.nombre});

    if(!pro){
        return res.status(402).send("Nombre incorrecto.");
    }

    let pro_enviar={
       mensaje:"Nombre: " + pro.nombre +  "\n" +
       "Descripción: " + pro.descripcion +  "\n" +
       "Precio: " + pro.precio +  "\n" +
       "Cantidad: " + pro.cantidad +  "\n" +
       "Categoria: " + pro.categoria +  "\n" +
       "Marca: " + pro.marca  +  "\n" +
       "Estado: " + pro.estado 
    }

    res.send({pro_enviar});

});

module.exports = router;