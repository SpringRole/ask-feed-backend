const express = require('express');
const passport = require('passport');
const router=require('./routes/auth_routes');
const router1=require('./routes/payment_routes');
const keys= require('./config/keys');
const passportSetup = require('./config/passport-setup');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app=express();
app.use('/auth',router);
app.use('/payment',router1);


app.get('/',(req,res)=>{
  res.send('sucess');
});
  
app.listen(2000);
