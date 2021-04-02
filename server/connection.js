const mongoose = require("mongoose");
require('dotenv').config();
mongoose.Promise = global.Promise;
//const MONGOURI= "mongodb+srv://admin123:admin123@cluster0.4hxea.mongodb.net/userlogindata?retryWrites=true&w=majority"
 
mongoose
  .connect(process.env.MONGOURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, //to be set to false to handle put change for findOneAndUpdate
  })
  .then(() => {
    console.log("db connected done");
  })
  .catch((e) => {
    console.log("No Connection");
  });
