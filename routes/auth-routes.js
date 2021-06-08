const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const router=require('express').Router();
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  module.exports=router;