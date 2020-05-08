const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: String,
  googleId: String,
  thumbnail: String,
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
