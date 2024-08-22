const express = require("express");
const bcrypt = require("bcrypt");
const { connection } = require("./config/db.js");
const cors = require("cors");
const app = express();

app.use(cors());

const { dashboardController } = require("./Routes/dashboard.routes.js");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./Models/User.model.js");
const { json } = require("express");
const { authentication } = require("./middleware/authentication.js");
const {sendEmail}  = require("./helper/helper")

app.use(express.json());
app.get("/", function (req, res) {
  res.send("welcoome to homepage");
});

app.post("/signup", async (req, res) => {
  let { name, email, password, username, mobile } = req.body;
  let user = await UserModel.findOne({ email });
  if(user){
    return res.send({status: false,message: "Email allready present."});
  }
  console.log(req.body);
  bcrypt
    .hash(password, 6)
    .then(async (hash) => {
      const user = new UserModel({ name, email, password: hash, username,mobile });
      await user.save();
      res.send({status: true, message: "successfully signed up" });
    })
    .catch((err) => {
      res.send({status: false, name: err,message:"somthing went wrong" });
    });
});
app.post("/login", async (req, res) => {
  let { email, password, type, userOtp } = req.body;
  console.log(req.body)
  let user = await UserModel.findOne({ email });
  if(!user){
    return res.send({status: false,message: "Login failed"});
  }
  console.log("user: ", user);
  const otp = Math.floor(Math.random() * 100000) + 100000;
  let hash = user.password;
  console.log("hash: ", hash);
  if(type == 'a'){
    const result = await bcrypt.compare(password, hash);
    const sentmail = await sendEmail(otp,email,user.name);
    if(sentmail.status){
      await UserModel.findByIdAndUpdate(user.id,{OTP: otp});
       return res.send({status: true, message: "otp send successfully"})
    }else{
      return res.send({status: false, message: "something went wrong"})
    }
  }else if(user.OTP !=userOtp){
   return res.send({status: false, message: "otp not matched"});
  }
  var token = jwt.sign({ email: email }, "secret");
  res.send({ status: true, message: "Login successful", token: token, name: user.name });
});

app.use("/dashboard",authentication, dashboardController);
const port = process.env.PORT || 8000;
app.listen(port, async (req, res) => {
  try {
    await connection;
    console.log("Connection established on port " + port);
  } catch (err) {
    console.log("Connection failed");
    console.log(err);
  }
});
