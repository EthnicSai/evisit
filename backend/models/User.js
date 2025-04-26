const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, // You may want to hash the password
});

module.exports = mongoose.model('User', userSchema);
