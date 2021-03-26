const mongoose = require('mongoose');
const validator = require('validator');
const Userdetails = mongoose.Schema({
    
    username:{
        type:String,
        required:true,
        maxlength:30    
    },
    useremail:{
        type:String,
        required:true,
        unique:[true, "Email ALready Exits!! please use some other email id"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email provided is Invalid")
            }
        }
    },
    userpasswd:{
        type:String,
        minlength:8,
        required:true
    }

},
{
    timestamps:true
})
const Userdata = new mongoose.model("Userdetails",Userdetails)
module.exports = Userdata;