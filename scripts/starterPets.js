//STARTER PET TEMPLATES
//When starting the game, users can currently receive pets from a selection of eight pre-defined 'starter' pets 

const Pet = require('./hatchEggs.js');

const starterPets = [
    {
        dna: {
            baseColorBlue: [{
                value: 0,
                isDominant: true
            }, {
                value: 1,
                isDominant: false
            }],
            baseColorGreen: [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            baseColorRed: [{
                value: 1,
                isDominant: false
            }, {
                value: 1,
                isDominant: false
            }]
        }
    },
    {
        dna: {
            baseColorBlue: [{
                value: 1,
                isDominant: false
            }, {
                value: 1,
                isDominant: false
            }],
            baseColorGreen: [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            baseColorRed: [{
                value: 0,
                isDominant: true
            }, {
                value: 1,
                isDominant: false
            }]
        }
    },
    {
        dna: {
            baseColorBlue: [{
                value: 0,
                isDominant: true
            }, {
                value: 1,
                isDominant: false
            }],
            baseColorGreen: [{
                value: 1,
                isDominant: true
            }, {
                value: 0,
                isDominant: false
            }],
            baseColorRed: [{
                value: 0,
                isDominant: true
            }, {
                value: 1,
                isDominant: false
            }]
        }
    },
    {
        dna: {
            baseColorBlue: [{
                value: 1,
                isDominant: false
            }, {
                value: 1,
                isDominant: false
            }],
            baseColorGreen: [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            baseColorRed: [{
                value: 1,
                isDominant: false
            }, {
                value: 1,
                isDominant: false
            }]
        }
    },
    {
        dna: {
            baseColorBlue: [{
                value: 1,
                isDominant: false
            }, {
                value: 1,
                isDominant: false
            }],
            baseColorGreen: [{
                value: 1,
                isDominant: true
            }, {
                value: 0,
                isDominant: false
            }],
            baseColorRed: [{
                value: 0,
                isDominant: true
            }, {
                value: 1,
                isDominant: false
            }]
        }
    },
    {
        dna: {
            baseColorBlue: [{
                value: 0,
                isDominant: true
            }, {
                value: 1,
                isDominant: false
            }],
            baseColorGreen: [{
                value: 1,
                isDominant: true
            }, {
                value: 0,
                isDominant: false
            }],
            baseColorRed: [{
                value: 1,
                isDominant: false
            }, {
                value: 1,
                isDominant: false
            }]
        }
    },
    {
        dna: {
            baseColorBlue: [{
                value: 1,
                isDominant: false
            }, {
                value: 1,
                isDominant: false
            }],
            baseColorGreen: [{
                value: 1,
                isDominant: true
            }, {
                value: 0,
                isDominant: false
            }],
            baseColorRed: [{
                value: 1,
                isDominant: false
            }, {
                value: 1,
                isDominant: false
            }]
        }
    },
    {
        dna: {
            baseColorBlue: [{
                value: 0,
                isDominant: true
            }, {
                value: 1,
                isDominant: false
            }],
            baseColorGreen: [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            baseColorRed: [{
                value: 0,
                isDominant: true
            }, {
                value: 1,
                isDominant: false
            }]
        }
    }
];

function getRandomStarter() {
    //return a random one of the possible starters
    const randomIndex = Math.floor(Math.random() * starterPets.length);
    return new Pet(starterPets[randomIndex]).toObj();
}

module.exports = getRandomStarter;