const mongoose = require('mongoose');       //traemos la paquteria de mongoose

const ArduinoSchema = new mongoose.Schema({  //creamos nuestro objeto json
    
    nSensor:String,
    valor:String,
}); 

mongoose.model("Arduino", ArduinoSchema);