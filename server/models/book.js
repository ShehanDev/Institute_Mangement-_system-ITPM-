const mongoose = require('mongoose');

const bookschema = mongoose.Schema({
    bid: String,
    name    :  String,
    course :  String,
    status :  String,
    author  :  String,
    quntity:Number,
    
    
    created  :{
        type : Date,
        default :Date.now
    }
});

module.exports = mongoose.model("Book",bookschema);
