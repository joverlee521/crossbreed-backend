// Pet model
// ==============

// Require mongoose
var mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the PetSchema with our schema class
var PetSchema = new Schema({
//(TO-DO)
});

// Create the Pet model using the PetSchema
var Pet = mongoose.model("Pet", PetSchema);

// Export the Pet model
module.exports = Pet;
