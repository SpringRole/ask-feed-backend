const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys= require('./keys');
const User=require('../models/user_oauth');
passport.use(new GoogleStrategy({
    clientID:keys.google.clientID ,
    clientSecret: keys.google.clientSecret,
    callbackURL: "/auth/google/callback"
  },(accessToken, refreshToken, profile, done)=> {
    User.findOne({googleId: profile.id})
    .then((currentuser)=>{
      if(currentuser){
        console.log('presnt');
        done(null, currentuser);
      }
      else{
        const user = new User({
          googleId: profile.id
        });
        user.save()
        .then((result)=>{
          console.log('db created');
          done(null, result);
        })
      }
      
    });
  }
));