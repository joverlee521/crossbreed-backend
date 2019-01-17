// Pet model
// ==============

// Require mongoose
const mongoose = require("mongoose");

// Create the PetSchema with our schema class
const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: function(val) {
                const valid = /[^a-zA-Z0-9 ]/g;
                return !valid.test(val);
            },
            message: "Pet name can only include alphanumeric and space characters"
        },
        trim: true,
        minlength: [1, "Pet must have a name"],
        maxlength: [50, "Max length is fifty characters"],
        required: [true, "Pet must have a name"],
        default: "Unnamed Pet"
    },
    lastBred: {
        type: Date,
        default: ""
    },
    isFavorite: {
        type: Boolean,
        default: false
    }, 
    baseColor: {}, 
    outlineColor: {},
    gameColor: {},
    parents: [{ type: Schema.Types.ObjectId }], 
    dna: {}
});

// Create the Pet model using the PetSchema
const Pet = mongoose.model("Pet", PetSchema);

// Export the Pet model
module.exports = Pet;
