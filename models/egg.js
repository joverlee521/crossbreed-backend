// Egg model
// ==============

// Require mongoose
const mongoose = require("mongoose");

// Create the EggSchema with our schema class
const EggSchema = new mongoose.Schema({
//(TO-DO)
});

// Create the Egg model using the EggSchema
const Egg = mongoose.model("Egg", EggSchema);

// Export the Egg model
module.exports = Egg;
