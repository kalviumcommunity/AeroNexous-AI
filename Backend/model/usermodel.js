const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },


  expertise: {
    type: String,
    enum: ['beginner', 'general', 'enthusiast', 'professional'],
    default: 'general', // Optional: set a default
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
