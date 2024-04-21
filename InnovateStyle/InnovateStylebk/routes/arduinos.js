var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");

const Arduino = mongoose.model("Arduino");
const Sensor2 = mongoose.model("Sensor2");

//consultar todo
router.get('/consultartodo', async function(req,res, next) {

    let arduinos = await Arduino.find({});
    res.status(200).json({ arduinos: arduinos });

});

router.get('/consultartodo2', async function(req,res, next) {

    let sensor2s = await Sensor2.find({});
    res.status(200).json({ sensor2s: sensor2s });

});

module.exports = router;