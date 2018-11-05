var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var router = express.Router();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/api/auth/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
  }
));

router.get('/', (req, res) => {
  res.json({success: 'true'});
});

router.get('/auth', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}));
router.get('/auth/callback', passport.authenticate('google', {failureRedirect: '/login'}), (req, res) => {
  console.log("Logged in");
  res.redirect('/');
});

module.exports = router;
