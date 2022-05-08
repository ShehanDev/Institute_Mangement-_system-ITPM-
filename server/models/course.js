const mongoose = require('mongoose');

const courseschema = mongoose.Schema({
    no:String,
    name    :  String,
    faculty :  String,
    discription :  String,
    lecturer  :  String,
    duraion   :  String,
    stdcont : Number,
    
    created  :{
        type : Date,
        default :Date.now
    }
});

module.exports = mongoose.model("Course",courseschema);