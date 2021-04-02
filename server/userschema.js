const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Userdetailschema = new mongoose.Schema({
    
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

Userdetailschema.pre("save", async function(next){
    if (this.isModified("userpasswd"))
    {
    // bcrypt password use hash round for 10
   this.userpasswd  = await bcrypt.hash(this.nuserpasswd,10);
   next();
    }
    // console.log(this.password);
    
});
// for comparing the password we can use 
// const passwordmatch = await bcrypt.compare(userpasswd,userpasswdhash)
const Userdata = new mongoose.model("Userdetails",Userdetailschema)
module.exports = Userdata;