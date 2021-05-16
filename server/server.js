const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("./connection");
const Userdata = require("./userschema");
const app = express();

app.use(express.json());
const jwtkey = "samplejsonwebtoken";
//console.log(Userdetailschema);

app.get("/api/allusers",verifytoken, async (req, res) => {
  try {
    const Userdetailschema = await Userdata.find({});
    res.send(Userdetailschema);
  } catch (error) {
    res.status(500);
  }
});
app.get("/api/searchuser/:emailid", async (req, res) => {
  try {
    await Userdata.findOne({ useremail: req.params.emailid }).then(
      (useremailiddata) => {
        res.status(200).send(useremailiddata);
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/api/searchusersname/:name", async (req, res) => {
  try {
    const regex = new RegExp(req.params.name, "i");
    await Userdata.find({ username: regex }).then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post("/api/registerUser", async (req, res) => {



  const Userdetailschema = new Userdata({
    username: req.body.username,
    useremail: req.body.useremail,
    userpasswd: req.body.userpasswd,
  });

  try {

    await Userdetailschema.save().then(() => {
      jwt.sign({ Userdetailschema }, jwtkey, { expiresIn: '300s' }, (err, token) => {
        res.status(201).json({token});
      })
      //res.status(201).send(Userdetailschema);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
app.post("/api/login", async (req, res) => {

  try {
    const email = req.body.useremail;
    const password = req.body.userpasswd;

    const useremailid = await Userdata.findOne({ useremail: email });
    //console.log(useremailid.userpasswd);
    const isMatch = await bcrypt.compare(password, useremailid.userpasswd);
    console.log("login user exist " + isMatch);


    if (isMatch) {
      jwt.sign({ useremailid }, jwtkey, { expiresIn: '300s' }, (err, token) => {
        res.status(200).json({token});
      });
      // res.status(201).send("Is a valid user");
    }
    else {
      res.send("Password is invalid ");
    }
  }
  catch (error) {
    res.status(400).send("Invalid login details provided");
  }

})
app.put("/api/updateuser/:emailid", async (req, res) => {
  try {
    await Userdata.findOneAndUpdate(
      { useremail: req.params.emailid },
      {
        $set: {
          username: req.body.username,
          useremail: req.body.useremail,
          userpasswd: req.body.userpasswd,
        },
      },
      {
        new: true,
      }
    ).then((result) => {
      res.status(201).send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
app.delete("/api/deleteuser/:emailid", async (req, res) => {
  try {
    Userdata.findOneAndDelete({ useremail: req.params.emailid }).then(
      (data) => {
        res.status(200).send(data);
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

// https://www.youtube.com/watch?v=HnQUzKqJSlU&list=PL8p2I9GklV44X970xDCQvts19-0XQWMeA&index=43
function verifytoken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    req.token = bearer[1];
    
    jwt.verify(req.token,jwtkey, (err, authdata) => {
      if (err) {
        res.send(err)
      }
      else {
        next();
      }
    })
    
  }
  else {
    res.status(401).send('Token not provided');
  }
}

//console.log(process.env.PORT,process.env.MONGOURI)

app.listen(3001, () => {
  console.log("listening on port 3001...");
});
