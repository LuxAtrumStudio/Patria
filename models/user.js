var mongoose = require('mongoose');
var bcrypt

var userSchema = mongoose.Schema({
  name: String,
  id: String,
});

var User = module.exports = mongoose.model('User', userSchema);
