const mongoose = require('mongoose');       //traemos la paquteria de mongoose

const Sensor2Schema = new mongoose.Schema({  //creamos nuestro objeto json
    
    nSensor:String,
    estado:String,
}); 

mongoose.model("Sensor2", Sensor2Schema);