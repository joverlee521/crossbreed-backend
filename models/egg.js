// Egg model
// ==============

// Require mongoose
var mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the EggSchema with our schema class
var EggSchema = new Schema({
//(TO-DO)
});

// Create the Egg model using the EggSchema
var Egg = mongoose.model("Egg", EggSchema);

// Export the Egg model
module.exports = Egg;
