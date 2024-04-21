// traemos la paqueteria mongoose y se la damos a una variable
const mongoose = require("mongoose");
// traemos la paquteria para token en nuestra variable
const jwt = require('jsonwebtoken');

// creamos un objeto y dentro le declaramos un json
const UsuarioSchema = new mongoose.Schema(
    {
        usuario: String,
        password: String
    }
);

UsuarioSchema.methods.generadorJWT = function(){
    return jwt.sign({
        nombre: 'Abel',
        ap_paterno: 'Vargas',
        email: this.email,      //de aqui viene la informacion de la base de datos
    },'c0ntr4s3n14');
}

// indicamos el modelo, el primer parametro indica como se identifica fuera del archivo y la segunda a que hace referencia
// el primer parametro lo toma la base de datos y lo pone en plural
mongoose.model("Usuario", UsuarioSchema);



