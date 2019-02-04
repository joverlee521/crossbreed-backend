//STARTER PET TEMPLATES
//When starting the game, users can currently receive pets from a selection of eight pre-defined 'starter' pets 
const Pet = require('../scripts/classes/pet');
/* const blackPet = require('./starterPets/blackPet.json');
const whitePet = require('./starterPets/whitePet.json');
const starterPetEggs = [blackPet, whitePet]; */

const blackPet = {
    _id: null,
    parents: [],
    dna: {
        controlGenes: [
            [
                {
                    isDominant: true,
                    controlGeneKeyName: "baseColor",
                    phenotypeKeyName: "baseColor",
                    references: null,
                    isCritical: true,
                    rnaMethod: "determineRGBA",
                    startIndex: 0,
                    numGenesToExpress: 24
                },
                {
                    isDominant: true,
                    controlGeneKeyName: "baseColor",
                    phenotypeKeyName: "baseColor",
                    references: null,
                    isCritical: true,
                    rnaMethod: "determineRGBA",
                    startIndex: 0,
                    numGenesToExpress: 24
                }
            ],
            [
                {
                    isDominant: true,
                    controlGeneKeyName: "outlineColor",
                    phenotypeKeyName: "outlineColor",
                    references: [
                        "baseColor"
                    ],
                    isCritical: true,
                    rnaMethod: "determineContrast",
                    startIndex: 0,
                    numGenesToExpress: 24
                },
                {
                    isDominant: true,
                    controlGeneKeyName: "outlineColor",
                    phenotypeKeyName: "outlineColor",
                    references: [
                        "baseColor"
                    ],
                    isCritical: true,
                    rnaMethod: "determineContrast",
                    startIndex: 0,
                    numGenesToExpress: 24
                }
            ],
            [
                {
                    isDominant: true,
                    controlGeneKeyName: "gameColor",
                    phenotypeKeyName: "gameColor",
                    references: [
                        "baseColor"
                    ],
                    isCritical: true,
                    rnaMethod: "determineGameColor",
                    startIndex: 0,
                    numGenesToExpress: 24
                },
                {
                    isDominant: true,
                    controlGeneKeyName: "gameColor",
                    phenotypeKeyName: "gameColor",
                    references: [
                        "baseColor"
                    ],
                    isCritical: true,
                    rnaMethod: "determineGameColor",
                    startIndex: 0,
                    numGenesToExpress: 24
                }
            ],
            [
                {
                    isDominant: true,
                    controlGeneKeyName: "extraGuesses",
                    phenotypeKeyName: "extraGuesses",
                    references: null,
                    isCritical: false,
                    rnaMethod: "determineInteger",
                    startIndex: 24,
                    numGenesToExpress: 4
                },
                {
                    isDominant: true,
                    controlGeneKeyName: "extraGuesses",
                    phenotypeKeyName: "extraGuesses",
                    references: null,
                    isCritical: false,
                    rnaMethod: "determineInteger",
                    startIndex: 24,
                    numGenesToExpress: 4
                }
            ],
            [
                {
                    isDominant: true,
                    controlGeneKeyName: "ears",
                    phenotypeKeyName: "ears",
                    references: null,
                    isCritical: false,
                    rnaMethod: "determineEars",
                    startIndex: 28,
                    numGenesToExpress: 1
                },
                {
                    isDominant: true,
                    controlGeneKeyName: "ears",
                    phenotypeKeyName: "ears",
                    references: null,
                    isCritical: false,
                    rnaMethod: "determineEars",
                    startIndex: 28,
                    numGenesToExpress: 1
                }
            ],
            [
                {
                    isDominant: true,
                    controlGeneKeyName: "antennae",
                    phenotypeKeyName: "antennae",
                    references: null,
                    isCritical: false,
                    rnaMethod: "determineAntennae",
                    startIndex: 29,
                    numGenesToExpress: 2
                },
                {
                    isDominant: true,
                    controlGeneKeyName: "antennae",
                    phenotypeKeyName: "antennae",
                    references: null,
                    isCritical: false,
                    rnaMethod: "determineAntennae",
                    startIndex: 29,
                    numGenesToExpress: 2
                }
            ]
        ],
        sequence: [
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 0,
                    isDominant: true
                }
            ], 
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 0,
                    isDominant: true
                }
            ], 
            [
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: true
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: false
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: false
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: true
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: false
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 0,
                    isDominant: true
                }
            ], 
            [ 
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: true
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: true
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: false
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: false
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: true
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: false
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [  
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 0,
                    isDominant: true
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: true
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: true
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: false
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: false
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: true
                }
            ],
            [ 
                {
                    value: 0,
                    isDominant: false
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [  
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: true
                }
            ], 
            [
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: true
                }
            ],
            [
                {
                    value: 1,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 1,
                    isDominant: false
                }
            ]
        ]
    }
}

//WHITE PET
const whitePet= {
    "_id": null,
    "parents": [],
    "dna": {
        "controlGenes": [
            [
                {
                    isDominant: true,
                    controlGeneKeyName: "baseColor",
                    phenotypeKeyName: "baseColor",
                    references: null,
                    isCritical: true,
                    rnaMethod: "determineRGBA",
                    startIndex: 0,
                    numGenesToExpress: 24
                },
                {
                    isDominant: true,
                    controlGeneKeyName: "baseColor",
                    phenotypeKeyName: "baseColor",
                    references: null,
                    isCritical: true,
                    rnaMethod: "determineRGBA",
                    startIndex: 0,
                    numGenesToExpress: 24
                }
            ],
            [
                {
                    isDominant: true,
                    controlGeneKeyName: "outlineColor",
                    phenotypeKeyName: "outlineColor",
                    references: [
                        "baseColor"
                    ],
                    isCritical: true,
                    rnaMethod: "determineContrast",
                    startIndex: 0,
                    numGenesToExpress: 24
                },
                {
                    isDominant: true,
                    controlGeneKeyName: "outlineColor",
                    phenotypeKeyName: "outlineColor",
                    references: [
                        "baseColor"
                    ],
                    isCritical: true,
                    rnaMethod: "determineContrast",
                    startIndex: 0,
                    numGenesToExpress: 24
                }
            ],
            [
                {
                    isDominant: true,
                    controlGeneKeyName: "gameColor",
                    phenotypeKeyName: "gameColor",
                    references: [
                        "baseColor"
                    ],
                    isCritical: true,
                    rnaMethod: "determineGameColor",
                    startIndex: 0,
                    numGenesToExpress: 24
                },
                {
                    isDominant: true,
                    controlGeneKeyName: "gameColor",
                    phenotypeKeyName: "gameColor",
                    references: [
                        "baseColor"
                    ],
                    isCritical: true,
                    rnaMethod: "determineGameColor",
                    startIndex: 0,
                    numGenesToExpress: 24
                }
            ],
            [
                {
                    isDominant: true,
                    controlGeneKeyName: "extraGuesses",
                    phenotypeKeyName: "extraGuesses",
                    references: null,
                    isCritical: false,
                    rnaMethod: "determineInteger",
                    startIndex: 24,
                    numGenesToExpress: 4
                },
                {
                    isDominant: true,
                    controlGeneKeyName: "extraGuesses",
                    phenotypeKeyName: "extraGuesses",
                    references: null,
                    isCritical: false,
                    rnaMethod: "determineInteger",
                    startIndex: 24,
                    numGenesToExpress: 4
                }
            ],
            [
                {
                    isDominant: true,
                    controlGeneKeyName: "ears",
                    phenotypeKeyName: "ears",
                    references: null,
                    isCritical: false,
                    rnaMethod: "determineEars",
                    startIndex: 28,
                    numGenesToExpress: 1
                },
                {
                    isDominant: true,
                    controlGeneKeyName: "ears",
                    phenotypeKeyName: "ears",
                    references: null,
                    isCritical: false,
                    rnaMethod: "determineEars",
                    startIndex: 28,
                    numGenesToExpress: 1
                }
            ],
            [
                {
                    isDominant: true,
                    controlGeneKeyName: "antennae",
                    phenotypeKeyName: "antennae",
                    references: null,
                    isCritical: false,
                    rnaMethod: "determineAntennae",
                    startIndex: 29,
                    numGenesToExpress: 2
                },
                {
                    isDominant: true,
                    controlGeneKeyName: "antennae",
                    phenotypeKeyName: "antennae",
                    references: null,
                    isCritical: false,
                    rnaMethod: "determineAntennae",
                    startIndex: 29,
                    numGenesToExpress: 2
                }
            ]
        ],
        "sequence": [
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ], 
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ], 
            [
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: true
                },
                {
                    value: 1,
                    isDominant: true
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ], 
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: true
                },
                {
                    value: 1,
                    isDominant: true
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: true
                },
                {
                    value: 1,
                    isDominant: true
                }
            ],
            [  
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: true
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [ 
                {
                    value: 1,
                    isDominant: true
                },
                {
                    value: 1,
                    isDominant: true
                }
            ],
            [  
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [
                {
                    value: 0,
                    isDominant: true
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [
                {
                    value: 0,
                    isDominant: false
                },
                {
                    value: 0,
                    isDominant: false
                }
            ],
            [
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ],
            [
                {
                    value: 1,
                    isDominant: false
                },
                {
                    value: 1,
                    isDominant: false
                }
            ]
        ]
    }
}

//ACTUAL FUNCTION HERE
const starterPetEggs = [ blackPet, whitePet];

//Takes an OPTIONAL parameter of how many starters to return (default is 2)
//Returns an array with the requested # of pets
function getRandomStarter(numPets = 2) {
    console.log(starterPetEggs.length);
    if (numPets > starterPetEggs.length || numPets <= 0) {
        throw new Error("Requested an invalid number of starter pets");
    }

    const petResults = [];

    for (let i = 0; i < numPets; i++) {
        let randomIndex = Math.floor(Math.random() * starterPetEggs.length);
        let randomPet = new Pet(starterPetEggs.splice(randomIndex, 1)[0]);
        petResults.push(randomPet);
    }
    return petResults;
}

module.exports = getRandomStarter;