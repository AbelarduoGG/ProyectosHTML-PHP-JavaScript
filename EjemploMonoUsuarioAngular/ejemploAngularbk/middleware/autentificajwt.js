//en este archivo nos aseguraremos que el usuario tenga un token para realizar el proceso

const jwt = require('jsonwebtoken');

function autentifica(req,res,next){     //recibe la peticion y la respuesta en una siguiente funcion
    const jwtoken = req.header('Authorization');    //revisa el encabezado en la peticion buscando la variable Authorization
    if(!jwtoken){   //sino existe la variable manda el mensaje
        return res.status(401).send('Acceso denegado. Necesita un token');
    }

    try{    //en caso de existir
        const payload = jwt.verify(jwtoken, 'c0ntr4s3n14');     //manda a llamar la funcion verify para saber que exista el token y que contenga nuestra palabra secreta del modelo (puesta en neustro usuario.js)
        req.user = payload;     //se llena la variable con el cuerpo del toke
        next();     //pasa a la siguiente funcion (baja, modificacion, alta, etc.)
    }
    catch(e){   //en caso de obtener un error en el try
        res.status(400).send('Acceso denegado. Token no valido');
    }
}

module.exports = autentifica       //indicamos que este codigo sera conocido como autentifica fuera de esta pagina