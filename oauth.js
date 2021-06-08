const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('./user');
const router=require('./routes/auth-routes');
const keys= require('./config/keys');
const passportSetup = require('./config/passport-setup');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app=express();
const url = 'mongodb+srv://santra2050:Abcd1234@cluster0.4yhpu.mongodb.net/Node-data?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{
console.log('connected to DB');
})
.catch((err)=>{
  console.log(err);
});
app.use('/auth',router);


app.get('/',(req,res)=>{
  res.send('sucess');
});
  
app.listen(2000);
