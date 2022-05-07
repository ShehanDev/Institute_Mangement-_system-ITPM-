const mongoose = require('mongoose');

const lectureschema = mongoose.Schema({
    lid     :String,
    name    :  String,
    gender :  String,
    faculty :  String,
    mobile :Number,
    email:String,
    
    created  :{
        type : Date,
        default :Date.now
    }
});

module.exports = mongoose.model("Lecture",lectureschema);