const express = require("express");
const passport = require('passport');
const router=require('./routes/auth_routes');
const router1=require('./routes/payment_routes');
const serveyRouter= require('./routes/servey');
const keys= require('./config/keys');
const passportSetup = require('./config/passport-setup');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require("mongoose");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const app = express();
require("dotenv").config();
require("./db/connectionDB");
const authRoutes = require("./routes/auth");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/auth',router);
app.use('/payment',router1);


app.get('/',(req,res)=>{
  res.send('sucess');
});
app.use("/api", authRoutes);
app.use('/create', serveyRouter);

app.listen(process.env.PORT || 2000, () => {
  console.log("server running on port 2000");
});
