const express = require("express");
const mongoose = require("mongoose");

require("./connection");
const Userdata = require("./userschema");
const app = express();

app.use(express.json());
//console.log(userdetails);

app.get("/api/allusers", async (req, res) => {
  try {
    const Userdetails = await Userdata.find({});
    res.send(Userdetails);
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
app.get("/api/searchusername/:name", async (req, res) => {
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
  const Userdetails = new Userdata({
    username: req.body.username,
    useremail: req.body.useremail,
    userpasswd: req.body.userpasswd,
  });
  try {
    await Userdetails.save().then(() => {
      res.status(201).send(Userdetails);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
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
app.listen(3001, () => {
  console.log("listening on port 3001...");
});
