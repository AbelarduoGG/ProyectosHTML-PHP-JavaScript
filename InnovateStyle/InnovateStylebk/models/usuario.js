const mongoose = require('mongoose');       //traemos la paquteria de mongoose
const jwt = require('jsonwebtoken');        //traemos la paqueteria de jwt

const UsuarioSchema = new mongoose.Schema({  //creamos nuestro objeto json
    
    nombre:String,
    apellidop:String,
    apellidom:String,
    correo:String,
    contrasena:String,
    direccion:String,
    imagen:String,
    rol:String,
    estado:String
}); 

UsuarioSchema.methods.generadorJWT = function(){    //metodo para generar el token
    return jwt.sign({
        nombre: this.nombre,
        apellidop: this.apellidop,
        apellidom: this.apellidom,
        correo: this.correo,
        
    }, 'c0ntr4s3n14');      //palabra secreta para verificar el token
}

mongoose.model("Usuario", UsuarioSchema);