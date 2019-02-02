//STARTER PET TEMPLATES
//When starting the game, users can currently receive pets from a selection of eight pre-defined 'starter' pets 

const Pet = require('../scripts/classes/pet');

const starterPetEggs = [
    {
        //OPTION 1 -- WHITE
        parents: [],
        dna: {
            //control gene
            baseColor: {
                red: {
                    '1': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '2': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '4': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '8': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '16': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '32': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '64': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '128': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }]
                },
                green: {
                    '1': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '2': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '4': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '8': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '16': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '32': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '64': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '128': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }]
                },
                blue: {
                    '1': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '2': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '4': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '8': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '16': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '32': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '64': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }],
                    '128': [{
                        value: 1,
                        isDominant: true
                    }, {
                        value: 1,
                        isDominant: true
                    }]
                }
            }
        }
    },
    {
        //OPTION 2: BLACK
        parents: [],
        dna: {
            //control gene
            baseColor: {
                red: {
                    '1': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '2': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '4': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '8': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '16': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '32': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '64': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '128': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }]
                },
                green: {
                    '1': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '2':[{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '4': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '8': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '16': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '32':[{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '64': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '128': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }]
                },
                blue: {
                    '1': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '2': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '4': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '8': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '16': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '32': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '64': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }],
                    '128': [{
                        value: 0,
                        isDominant: false
                    }, {
                        value: 0,
                        isDominant: false
                    }]
                }
            }
        }
    }
];

//Takes an OPTIONAL parameter of how many starters to return (default is 2)
//Returns an array with the requested # of pets
function getRandomStarter(numPets=2) {
    if(numPets>starterPetEggs.length || numPets <= 0) {
        return new Error("Requested an invalid number of starter pets");
    }

    const petResults = [];
    for(let i=0; i<numPets; i++) {

        let randomIndex = Math.floor(Math.random() * starterPetEggs.length); 
        let randomPet = new Pet(starterPetEggs.splice(randomIndex, 1)[0]);
        petResults.push(randomPet);
    }
    return petResults;
}

module.exports = getRandomStarter;