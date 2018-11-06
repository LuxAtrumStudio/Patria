var mongoose = require('mongoose');
var bcrypt

// Testtt

var userSchema = mongoose.Schema({
  name: String,
  hideNavbar: Boolean,
  layout: [
    {
      height: Number,
      cards: [
        {
          api: String,
          width: Number,
        }
      ],
    }
  ],
  tokens: [
    {
      api: String,
      token: String,
      options: String,
    }
  ],
});

var User = module.exports = mongoose.model('User', userSchema);

function encryptToken(google_id, token) {
  const cipher = crypto.createCipher('aes192', google_id);
  return (cipher.update("Hello World!", 'utf8', 'hex') + cipher.final('hex'));
}
function decryptToken(google_id, token) {
  const decipher = crypto.createDecipher('aes192', req.user.id);
  return (decipher.update(encrypt, 'hex', 'utf8') + decipher.final('utf8'));
}

module.exports.findIdOrCreate = (name, callback) => {
  User.findOne({name: name}, (err, user) => {
    if (err) return callback(err, null);
    if (user) return callback(null, user.id);
    const newUser = new User({
      name: name
    });
    newUser.save((err, user) => {
      if (err) return callback(err, null);
      return callback(null, user.id);
    });
  });
}

module.exports.setToken = (id, google_id, api, token, options, callback) => {
  User.findById(id, (err, user) => {
    if (err) return callback(err, null);
    user.tokens.push({api: api, token: encryptToken(token), options: JSON.stringify(options)});
    callback(null, user);
  });
}

module.exports.getToken = (id, google_id, api, callback) => {
  User.findById(id, (err, user) => {
    if (err) return callback(err, null);
    const token = user.tokens.find((tkn) => tkn.api === api);
    callback(null, token);
  });
}
