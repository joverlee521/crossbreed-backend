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
            [{
                isDominant: true,
                controlGeneKeyName: "ears",
                phenotypeKeyName: "ears",
                references: null,
                isCritical: false,
                rnaMethod: "determineEars",
                startIndex: 24,
                numGenesToExpress: 1
            },
            {
                isDominant: true,
                controlGeneKeyName: "ears",
                phenotypeKeyName: "ears",
                references: ['innerEarColor'],
                isCritical: false,
                rnaMethod: "determineEars",
                startIndex: 24,
                numGenesToExpress: 1
            }]/* ,
            [{
                isDominant: true,
                controlGeneKeyName: "innerEarColor",
                phenotypeKeyName: null, //this is an example of an INTERNAL gene
                references: ['innerEarColor'],
                isCritical: false,
                rnaMethod: "determineRGBA",
                startIndex: 0,
                numGenesToExpress: 24
            }, 
            {
                isDominant: true,
                controlGeneKeyName: "innerEarColor",
                phenotypeKeyName: null, //this is an example of an INTERNAL gene
                references:  ['innerEarColor'],
                isCritical: false,
                rnaMethod: "determineRGBA",
                startIndex: 0,
                numGenesToExpress: 24
            } ] */
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
            [{
                isDominant: true,
                controlGeneKeyName: "ears",
                phenotypeKeyName: "ears",
                references: ['innerEarColor'],
                isCritical: false,
                rnaMethod: "determineEars",
                startIndex: 24,
                numGenesToExpress: 1
            },
            {
                isDominant: true,
                controlGeneKeyName: "ears",
                phenotypeKeyName: "ears",
                references: ['innerEarColor'],
                isCritical: false,
                rnaMethod: "determineEars",
                startIndex: 24,
                numGenesToExpress: 1
            }] ,/*
            [{
                isDominant: true,
                controlGeneKeyName: "innerEarColor",
                phenotypeKeyName: null, //this is an example of an INTERNAL gene
                references: null,
                isCritical: false,
                rnaMethod: "determineRGBA",
                startIndex: 0,
                numGenesToExpress: 24
            }, 
            {
                isDominant: true,
                controlGeneKeyName: "innerEarColor",
                phenotypeKeyName: null, //this is an example of an INTERNAL gene
                references: null,
                isCritical: false,
                rnaMethod: "determineRGBA",
                startIndex: 0,
                numGenesToExpress: 24
            } ], */
            [{
                isDominant: true,
                controlGeneKeyName: "antennae",
                phenotypeKeyName: "antennae",
                references: null,
                isCritical: false,
                rnaMethod: "determineAntennae",
                startIndex: 28,
                numGenesToExpress: 1
            },
            {
                isDominant: true,
                controlGeneKeyName: "antennae",
                phenotypeKeyName: "antennae",
                references: null,
                isCritical: false,
                rnaMethod: "determineAntennae",
                startIndex: 28,
                numGenesToExpress: 1
            }]
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
  console.log("Made the egg");
  console.log("Baby's genes: " + newEgg.dna.controlGenes.length + "  and " + newEgg.dna.sequence.length);  
}
catch(err) {
    console.log(err.message);
}

 try {
    let newPet = new Pet(newEgg);
    for(key in newPet) {
        if(key!=='dna') {
            if(typeof(newPet[key])==="object") {
                console.group(key);
                for(let addlKey in newPet[key]) {
                    if(typeof(newPet[key][addlKey])==="object") {
                        console.group(addlKey);
                        for(let finalKey in newPet[key][addlKey]) {
                           
                            console.log(finalKey + ": "+ newPet[key][addlKey][finalKey])
                            
                        }
                        console.groupEnd();
                    }else {
                    console.log(addlKey + ": "+ newPet[key][addlKey])}
                }
                console.groupEnd();
            }
            else {
            console.log(key + ": " + newPet[key]);
        }   
        }
    }
}
catch(err) {
    console.log(err.message);
} 