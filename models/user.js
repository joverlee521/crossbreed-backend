// User model
// ==============

// Require mongoose
const mongoose = require('mongoose');

// Create the UserSchema 
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

// Create the User model using the UserSchema
const User = mongoose.model('User', userSchema);

//exports.User =  User;
//exports.userSchema = userSchema;

// Export the User model
module.exports = User;
