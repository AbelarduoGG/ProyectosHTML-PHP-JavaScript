const jwt = require('jsonwebtoken');

function autentifica(req, res, next) {
    const jwtoken = req.header('Authorization');

    if (!jwtoken) {
        return res.status(401).send('Acceso denegado. Necesita un token');
    }

    try {
        const payload = jwt.verify(jwtoken.split(' ')[1], 'c0ntr4s3n14'); // Extraemos el token de 'Bearer <token>'
        req.user = payload;         //traemos el contenido
        next();             //pasamos al siguiente proceso
    } catch (e) {
        res.status(400).send('Acceso denegado. Token no válido');
    }
}

module.exports = autentifica;
