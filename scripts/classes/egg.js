//EGG CLASS
//Goal is to create new eggs from parental DNA

//DNA validators make sure that the parents' dna object has the correct keys, etc
//const checkDNA = require('../../validators/dnaValidator');

class Egg {
    //The egg class takes in two parents and returns an egg
    constructor(mom, dad) {
        if (!mom.hasOwnProperty('dna') || !dad.hasOwnProperty('dna')) {
            throw new Error("Parents must have DNA!");
        }

        this.dna = {
            controlGenes: [],
            sequence: []
        };

        //The DNA sequence itself is fairly straightforward...only issue might be if one parent has more genes than the other (which introduces a high rate of genetic illness)
        let momIndex = 0; 
        let dadIndex = 0;
        const maxMomGenes = mom.dna.sequence.length;
        const maxDadGenes = dad.dna.sequence.length; 
        while(momIndex < maxMomGenes && dadIndex < maxDadGenes) {
            let randomMomAllele = this.getRandomAllele(mom.dna.sequence[momIndex]);
            let randomDadAllele = this.getRandomAllele(dad.dna.sequence[momIndex]);
            this.dna.sequence.push([randomMomAllele, randomDadAllele]);
            momIndex+=1;
            dadIndex+=1;
        }
        //Make sure we catch any lingering mismatch between the parents
        for(let i = momIndex; i<maxMomGenes; i++) {
            this.dna.sequence.push([ mom.dna.sequence[i], ""] );
        }
        for(let j = dadIndex; j<maxDadGenes; j++) {
            this.dna.sequence.push([ "", dad.dna.sequence[j] ]);
        }

        //Next we tackle the hard part: control genes
        //These MUST be either matched correctly, or be matched vs a null
        //We will handle this by making some quick maps 
        const momControlGenes = {};
        const dadControlGenes = {}; 
        mom.dna.controlGenes.forEach(genePair => {
            let randomizedAllele = this.getRandomAllele(genePair); 
            momControlGenes[randomizedAllele.controlGeneKeyName] = randomizedAllele;
        });

        dad.dna.controlGenes.forEach(genePair => {
            let randomizedAllele = this.getRandomAllele(genePair); 
            dadControlGenes[randomizedAllele.controlGeneKeyName] = randomizedAllele;
        });

        //Start with mom
        for(let key in momControlGenes) {
            if(dadControlGenes.hasOwnProperty(key)) {
                this.dna.controlGenes.push([ momControlGenes[key], dadControlGenes[key] ]);
            }
            else {
                this.dna.controlGenes.push([ momControlGenes[key], null]);
            }
        }        

        //Now handle any mismatch between parents - if we didn't get a gene from mom, should come from dad
        for(let key in dadControlGenes) {
            if(!this.dna.controlGenes.hasOwnProperty(key)) {
                this.dna.controlGenes.push([ null, dadControlGenes[key] ]);
            }
        }
        //Lastly, add the parents' obj _id to the child's array of parents so that we can keep track of who belongs to whom
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