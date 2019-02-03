const Pet = require('./classes/pet');
const Egg = require('./classes/egg');
//DNA sequence vs control genes
//Higher mutation rate within DNA vs control genes
//Chromosomes are arrays that have both control genes and the overall sequence
//Considerations:
//Faster to read only partial DNA IF we use key names on controlGenes
//However, more flexible if we don't

const mom =
{
    _id: 1,
    parents: [],
    dna: {
        //a map showing where control genes are for this particular creature - rendered ONCE so that we can quickly pull it up again when necessary
        controlGenes: [
            [{
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
            } ],
            [{
                isDominant: true,
                controlGeneKeyName: "outlineColor",
                phenotypeKeyName: "outlineColor",
                references: ["baseColor"],
                isCritical: true,
                rnaMethod: "determineContrast",
                startIndex: 0,
                numGenesToExpress: 24
            },
            {
                isDominant: true,
                controlGeneKeyName: "outlineColor",
                phenotypeKeyName: "outlineColor",
                references: ["baseColor"],
                isCritical: true,
                rnaMethod: "determineContrast",
                startIndex: 0,
                numGenesToExpress: 24
            }],
            [{
                isDominant: true,
                controlGeneKeyName: "gameColor",
                phenotypeKeyName: "gameColor",
                references: ["baseColor"],
                isCritical: true,
                rnaMethod: "determineGameColor",
                startIndex: 0,
                numGenesToExpress: 24
            },
            {
                isDominant: true,
                controlGeneKeyName: "gameColor",
                phenotypeKeyName: "gameColor",
                references: ["baseColor"],
                isCritical: true,
                rnaMethod: "determineGameColor",
                startIndex: 0,
                numGenesToExpress: 24
            }], 
            [{
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
            }],
        ],
        sequence: [
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }],
            [{
                value: 1,
                isDominant: true
            }, {
                value: 1,
                isDominant: true
            }]
        ]
    }

};

const dad =
{
    _id: 2,
    parents: [],
    dna: {
        //a map showing where control genes are for this particular creature - rendered ONCE so that we can quickly pull it up again when necessary
        controlGenes: [
            [{
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
            } ],
            [{
                isDominant: true,
                controlGeneKeyName: "outlineColor",
                phenotypeKeyName: "outlineColor",
                references: ["baseColor"],
                isCritical: true,
                rnaMethod: "determineContrast",
                startIndex: 0,
                numGenesToExpress: 24
            },
            {
                isDominant: true,
                controlGeneKeyName: "outlineColor",
                phenotypeKeyName: "outlineColor",
                references: ["baseColor"],
                isCritical: true,
                rnaMethod: "determineContrast",
                startIndex: 0,
                numGenesToExpress: 24
            }],
            [{
                isDominant: true,
                controlGeneKeyName: "gameColor",
                phenotypeKeyName: "gameColor",
                references: ["baseColor"],
                isCritical: true,
                rnaMethod: "determineGameColor",
                startIndex: 0,
                numGenesToExpress: 24
            },
            {
                isDominant: true,
                controlGeneKeyName: "gameColor",
                phenotypeKeyName: "gameColor",
                references: ["baseColor"],
                isCritical: true,
                rnaMethod: "determineGameColor",
                startIndex: 0,
                numGenesToExpress: 24
            }], 
            [{
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
            }],
        ],
        sequence: [
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }],
            [{
                value: 0,
                isDominant: false
            }, {
                value: 0,
                isDominant: false
            }]
        ]
    }

};

let newEgg;
try {
  console.log("Mom's genes: " + mom.dna.controlGenes.length + "  and " + mom.dna.sequence.length);

  console.log("Dad's genes: " + dad.dna.controlGenes.length + "  and " + dad.dna.sequence.length);  
  newEgg = new Egg(mom, dad);

}
catch(err) {
    console.log(err.message);
}

 try {
    let newPet = new Pet(newEgg);
    console.log(newPet.baseColor);
}
catch(err) {
    console.log(err.message);
} 