//EGG CLASS
//Goal is to create new eggs from parental DNA

//DNA validators make sure that the parents' dna object has the correct keys, etc
const checkDNA = require('../../validators/dnaValidator');

class Egg {
    //The egg class takes in two parents and returns an egg
    constructor(mom, dad) {
        if (!mom.hasOwnProperty('dna') || !dad.hasOwnProperty('dna')) {
            throw new Error("Parents must have DNA!");
        }

        if (!checkDNA.isValidDNA(mom.dna) || (!checkDNA.isValidDNA(dad.dna))) {
            throw new Error("Parents must have valid DNA!");
        }

        this.dna = {};

        //Randomly combine the parents' dna into dna for the child
        for (let topLevelKey in mom.dna) {
            //first level is the base gene  
            //(right now, that's only baseColor)
            let momTopLevel = mom.dna[topLevelKey];
            let dadTopLevel = dad.dna[topLevelKey];
            this.dna[topLevelKey] = {}; //initialize a key for the child
            let childTopLevel = this.dna[topLevelKey];
            //now we go to the next level 
            for (let secondLevelKey in momTopLevel) {
                let momSecondLevel = momTopLevel[secondLevelKey];
                let dadSecondLevel = dadTopLevel[secondLevelKey];
                //initialize a key for the child
                childTopLevel[secondLevelKey] = {};
                let childSecondLevel = childTopLevel[secondLevelKey];
                //finally!  we can touch the gene pairs themselves
                for (let finalKey in momSecondLevel) {
                    childSecondLevel[finalKey] = [];
                    childSecondLevel[finalKey].push(this.getRandomAllele(momSecondLevel[finalKey]));
                    childSecondLevel[finalKey].push(this.getRandomAllele(dadSecondLevel[finalKey]));
                }
            }
        }
        //Lastly, add the parents' obj _id to the child's array of parents
        this.parents = [];
        if (mom.hasOwnProperty('_id')) {
            this.parents.push(mom._id);
        }
        if (dad.hasOwnProperty('_id')) {
            this.parents.push(dad._id);
        }
    }

    getRandomAllele(gene) {
        const whichGene = Math.floor(Math.random() * Math.floor(2));
        return (whichGene ? gene[0] : gene[1]);
    }

    toObj() {
        return {
            dna: this.dna,
            parents: this.parents
        };
    }
}

module.exports = Egg;