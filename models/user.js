// User model
// ==============

// Require mongoose
var mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the UserSchema with our schema class
var UserSchema = new Schema({
    //(TO-DO)
    
});

// Create the User model using the UserSchema
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
