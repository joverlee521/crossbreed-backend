const mongoose = require("mongoose");
const dnaCheck = require("../validators/dnaValidator");

const petSchema = new mongoose.Schema({
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
  //Note: we are not requiring the user id because later on folks can 'release' pets
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" 
  },
  //Note: 'lastBred' stores the timestamp of the most recent successful breeding
  //We can use that date to determine when the creature is ready to breed again
  lastBred: {
    type: Date, 
    default: ""
  },
  isWild: {
    type: Boolean,
    default: false
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  level: {
    type: Number,
    default: 1
  },
  experiencePoints: {
    type: Number,
    default: 0
  },
  baseColor: {},
  outlineColor: {},
  gameColor: {},
  parents: [{ type: mongoose.Schema.Types.ObjectId }],
  dna: {
    type: mongoose.Schema.Types.Mixed, 
    validate: {
    validator: function(val) {
      return dnaCheck.isValidDNA(val);
    }
  }
  }
});

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;

