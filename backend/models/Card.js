const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  qualification: { type: String, required: true },
  designation: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String },
  qrCode: { type: String, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Card', cardSchema);
