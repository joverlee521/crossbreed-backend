//BREEDING PET FUNCTIONS -- EGG CREATION
//Goal is to create new eggs from parental DNA

const Egg = {
    //The pet constructor takes in two parents and produces an egg to contain offspring

    createFromParents: function (mom, dad) {
        //first, validate that mom & dad have the right expected structure - if not, everything will break
        //(TO-DO) Add error checking with Joi

        const child = {
            dna: {},
            parents: []
        };
        //Randomly combine the parents' dna into dna for the child
        for (let key in mom.dna) {
            if (mom.dna.hasOwnProperty(key) && dad.dna.hasOwnProperty(key)) {
                child.dna[key] = []; //start an empty array for the child's dna
                child.dna[key].push(this.getRandomAllele(mom.dna[key])); //add a random allele from both parents!
                child.dna[key].push(this.getRandomAllele(dad.dna[key]));
            }
        }
        //Lastly, add the parents' obj _id to the child's array of parents
        child.parents = [mom._id, dad._id];
        return child; //and return the child
    },

    getRandomAllele: function (gene) {
        const whichGene = Math.floor(Math.random() * Math.floor(2));
        return (whichGene ? gene[0] : gene[1]);
    }
}

module.exports = Egg;

