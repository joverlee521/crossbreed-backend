//STARTER PET TEMPLATES
//When starting the game, users can currently receive pets from a selection of eight pre-defined 'starter' pets 

const starterPets = [
    {
        name: "Red",
        baseImage: "testPet.svg",
        baseColor: {
            red: 255,
            blue: 0,
            green: 0,
            transparency: 1 
        },
        outlineColor: {
            red: 0,
            blue: 0,
            green: 0,
            transparency: 1
        },
        gameColor: {
            primary: "red",
            secondary: "red"
        },
        isFavorite: false,
        parents: [],
        dna: {}, //NOTE: dna will go here soon
    },
    {
        name: "Blue",
        baseImage: "testPet.svg",
        baseColor: {
            red: 0,
            blue: 255,
            green: 0,
            transparency: 1 
        },
        outlineColor: {
            red: 0,
            blue: 0,
            green: 0,
            transparency: 1
        },
        gameColor: {
            primary: "blue",
            secondary: "blue"
        },
        isFavorite: false,
        parents: [],
        dna: {}, //NOTE: dna will go here soon
    },
    {
        name: "Green",
        baseImage: "testPet.svg",
        baseColor: {
            red: 0,
            blue: 0,
            green: 255,
            transparency: 1 
        },
        outlineColor: {
            red: 0,
            blue: 0,
            green: 0,
            transparency: 1
        },
        gameColor: {
            primary: "green",
            secondary: "green"
        },
        isFavorite: false,
        parents: [],
        dna: {}, //NOTE: dna will go here soon
    },
    {
        name: "Yellow",
        baseImage: "testPet.svg",
        baseColor: {
            red: 255,
            blue: 255,
            green: 0,
            transparency: 1 
        },
        outlineColor: {
            red: 0,
            blue: 0,
            green: 0,
            transparency: 1
        },
        gameColor: {
            primary: "Yellow",
            secondary: "Yellow"
        },
        isFavorite: false,
        parents: [],
        dna: {}, //NOTE: dna will go here soon
    },
    {
        name: "Cyan",
        baseImage: "testPet.svg",
        baseColor: {
            red: 0,
            blue: 255,
            green: 255,
            transparency: 1 
        },
        outlineColor: {
            red: 0,
            blue: 0,
            green: 0,
            transparency: 1
        },
        gameColor: {
            primary: "Cyan",
            secondary: "Cyan"
        },
        isFavorite: false,
        parents: [],
        dna: {}, //NOTE: dna will go here soon
    },
    {
        name: "Magenta",
        baseImage: "testPet.svg",
        baseColor: {
            red: 255,
            blue: 0,
            green: 255,
            transparency: 1 
        },
        outlineColor: {
            red: 0,
            blue: 0,
            green: 0,
            transparency: 1
        },
        gameColor: {
            primary: "Magenta",
            secondary: "Magenta"
        },
        isFavorite: false,
        parents: [],
        dna: {}, //NOTE: dna will go here soon
    },
    {
        name: "White",
        baseImage: "testPet.svg",
        baseColor: {
            red: 255,
            blue: 255,
            green: 255,
            transparency: 1 
        },
        outlineColor: {
            red: 255,
            blue: 255,
            green: 255,
            transparency: 1
        },
        gameColor: {
            primary: "white",
            secondary: "white"
        },
        isFavorite: false,
        parents: [],
        dna: {}, //NOTE: dna will go here soon
    },
    {
        name: "Black",
        baseImage: "testPet.svg",
        baseColor: {
            red: 0,
            blue: 0,
            green: 0,
            transparency: 1 
        },
        outlineColor: {
            red: 255,
            blue: 255,
            green: 255,
            transparency: 1
        },
        gameColor: {
            primary: "black",
            secondary: "black"
        },
        isFavorite: false,
        parents: [],
        dna: {}, //NOTE: dna will go here soon
    }
]

function getRandomStarter() {
    //return a random one of the possible starters
    const randomIndex = Math.floor(Math.random()*starterPets.length);
    return starterPets[randomIndex];
}

module.exports = getRandomStarter;