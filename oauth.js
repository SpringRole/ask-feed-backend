const express=require('express');
const passport=require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app=express();
passport.use(new GoogleStrategy({
    //paste here
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  app.get('/',(req,res)=>{
res.send('<p>welcome</p>');
  });
  app.get('/login',(req,res)=>{
    res.send('<p>failed</p>');
  });
  const PORT=process.env.PORT || 8000;
  app.listen(PORT);
