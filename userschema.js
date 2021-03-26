const mongoose = require('mongoose');
// const validator = require('validator');
const Userdetails = mongoose.Schema({
    
    username:{
        type:String,
        required:true,

    },
    useremail:{
        type:String,
        required:true,
        unique:true
    },
    userpasswd:{
        type:String,
    }

},
{
    timestamps:true
})
const Userdata = new mongoose.model("Userdetails",Userdetails)
module.exports = Userdata;