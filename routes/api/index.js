var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var crypto = require('crypto');
var router = express.Router();

var User = require('../../models/user.js');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/api/auth/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, callback) => {
  User.findIdOrCreate(user.displayName, (err, uid) => {
    callback(null, {
      id: user.id,
      uid: uid,
      name: user.displayName
    });
  });
});

passport.deserializeUser((user, callback) => {
  callback(null, user);
});

router.get('/', (req, res) => {
  console.log('\033[1;34m[router] GET \'api/\'\033[0m');
  const cipher = crypto.createCipher('aes192', req.user.id);
  const decipher = crypto.createDecipher('aes192', req.user.id);
  const encrypt = cipher.update("Hello World!", 'utf8', 'hex') + cipher.final('hex');
  const decrypt = decipher.update(encrypt, 'hex', 'utf8') + decipher.final('utf8');
  console.log(encrypt);
  console.log(decrypt);
});

router.get('/token', (req, res) => {
  console.log('\033[1;34m[router] GET \'api/token\'\033[0m');
  if (!req.user) return res.json({
    success: false,
    error: 'No currently authenticated user'
  });
});

router.get('/token/:api', (req, res) => {
  console.log('\033[1;34m[router] GET \'api/token/:api\'\033[0m');
  if (!req.user) return res.json({
    success: false,
    error: 'No currently authenticated user'
  });
  User.getToken(req.user.uid, req.user.id, req.params.api, (err, token) => {
    if (err || token === undefined) return res.json({
      success: false,
      error: 'No token for \'' + req.params.api + '\' found for ' + req.user.name
    });
    return res.json(token);
  });
});

router.post('/token/:api', (req, res) => {
  console.log('\033[1;35m[router] POST \'api/token/:api\'\033[0m');
  if (!req.user) return res.json({
    success: false,
    error: 'No currently authenticated user'
  });
  User.setToken(req.user.uid, req.user.id, req.params.api, req.body.token, req.body.options, (err, token) => {
    if (err) return res.json({
      success: false,
      error: err
    });
    return res.json({
      api: req.params.api,
      token: req.body.token,
      options: req.body.options
    });
  });
});

router.get('/auth', (req, res) => {
  console.log('\033[1;34m[router] GET \'api/auth\'\033[0m');
  if (req.user) return res.json({
    success: true,
    user: req.user
  });
  return res.json({
    success: false,
    error: 'No currently authenticated user'
  });
});
router.get('/auth/login', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login']
}));
router.get('/auth/callback', passport.authenticate('google', {
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/');
});
router.get('/auth/logout', (req, res) => {
  console.log('\033[1;34m[router] GET \'/api/auth/logout\'\033[0m');
  req.session = null;
  if (req.user) {
    res.json({
      success: true
    });
  } else {
    res.json({
      success: false,
      error: 'No currently authenticated user'
    });
  }
});

module.exports = router;
