const blackPet = require('./starterPets/blackPet.json');
const whitePet = require('./starterPets/whitePet.json');
const Pet = require('./classes/pet')
const Egg = require('./classes/egg')

const blackBaby = new Pet(blackPet);
const whiteBaby = new Pet(whitePet);

console.log("================BLACK=============")
readObject(blackBaby, "dna");
console.log(blackBaby.dna.sequence.length);
console.log("================WHITE=============")
readObject(whiteBaby, "dna");
console.log(whiteBaby.dna.sequence.length);

//recursively read obj data!
function readObject(obj, exclude = "") {
    for (let key in obj) {
        if (key !== exclude) {
            if (typeof (obj[key]) === "object") {
                console.group(key);
                readObject(obj[key]);
                console.groupEnd();
            } else {
                console.log(key + ": " + obj[key]);
            }
        }
    }
}