const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
      type: String,
      unique:true
  },
  name: {
    type: String,
    required: false,
    minLength: 2
  },
  profileURL: {
    type: String,
    required: false
  },
  device: {
    type: String
  },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
