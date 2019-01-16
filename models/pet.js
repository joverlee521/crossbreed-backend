
const mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
const Schema = mongoose.Schema;

// Create the PetSchema with our schema class
const petSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: function (val) {
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastBred: {
        type: Date,
        required: true,
        default: Date.now
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

// Create the Pet model using the petSchema
const Pet = mongoose.model("Pet", petSchema);

// Export the Pet model
module.exports = Pet;

// const mongoose = require("mongoose");

// const petSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         validate: {
//             validator: function (val) {
//                 const valid = /[^a-zA-Z0-9 ]/g;
//                 return !valid.test(val);
//             },
//             message: "Pet name can only include alphanumeric and space characters"
//         },
//         trim: true,
//         minlength: [1, "Pet must have a name"],
//         maxlength: [50, "Max length is fifty characters"],
//         required: [true, "Pet must have a name"],
//         default: "Unnamed Pet"
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//       },
//     lastBred: {
//         type: Date,
//         required: true,
//         default: Date.now
//     },
//     isFavorite: {
//         type: Boolean,
//         default: false
//     },
//     baseColor: {},
//     outlineColor: {},
//     gameColor: {},
//     parents: [{ type: mongoose.Schema.Types.ObjectId }],
//     dna: {}
// });

// const Pet = mongoose.model("Pet", petSchema);

// module.exports = Pet;