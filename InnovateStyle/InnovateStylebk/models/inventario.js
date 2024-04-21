const mongoose = require('mongoose');       //traemos la paquteria de mongoose

const ProductoSchema = new mongoose.Schema({  //creamos nuestro objeto json
    
    proveedor_id:String,
    nombre:String,
    descripcion:String,
    precio:String,
    cantidad:String,
    imagen1:String,
    categoria:String,
    estado:String,
    marca:String 
}); 

mongoose.model("Producto", ProductoSchema);