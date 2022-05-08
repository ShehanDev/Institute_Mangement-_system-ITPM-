const mongoose = require('mongoose');

const studentschema = mongoose.Schema({
    no      :  String,
    name    :  String,
    faculty :  String,
    batch :   String,
    mobile : Number,
    
   
    
    created  :{
        type : Date,
        default :Date.now
    }
});

module.exports = mongoose.model("Student",studentschema);