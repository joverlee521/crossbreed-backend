//HATCH PETS FROM EGGS
//Takes in an egg (which contains dna) and then interprets the phenotype of the pet from the dna contained :)
class Pet {
    //The pet constructor takes in an egg and interprets its dna into a real pet!
    constructor(egg) {
        //(TO-DO) add better validation with Joi
        this.dna = egg.dna;
        this.parents = egg.parents;
        //PHENOTYPE INTERPRETATION 

        //BASE COLOR
        //set rgb color values for the base body of the creature
        this.baseColor = this.determineColor("baseColor");

        //OUTLINE COLOR (contrast color)
        //long-term this could also be gene-controlled 
        this.outlineColor = this.determineOutlineColor(this.baseColor); 

        //GAME COLOR
        //Interpret which color(s) the creature should 'count as' in the game
        this.gameColor = this.determineGameColor(this.baseColor);
    }

    toObj() {
        return {
            dna: this.dna,
            parents: this.parents,
            baseColor: this.baseColor,
            outlineColor: this.outlineColor,
            gameColor: this.gameColor
        };
    }

    determineColor(geneGroup) {
        //for now: we have a hard-coded map of which sourcekeys map to which output keys
        const colors = ["Red", "Green", "Blue"].map(color => {
            return {
                sourceKey: geneGroup + color,
                outputKey: color.toLowerCase()
            }
        });

        //start an object for the evaluated colors
        const evaluatedColor = {};
        colors.forEach(color => {
            if (this.dna.hasOwnProperty(color.sourceKey)) {
                //figure out which gene is dominant
                const geneToExpress = this.determineDominance(this.dna[color.sourceKey]);
                //(To-Do) check for codominance?
                evaluatedColor[color.outputKey] = (geneToExpress.value ? 255 : 0);
            }
        });
        evaluatedColor.transparency = 1;
        return evaluatedColor;
    }

    determineOutlineColor(color) {
        //This looks at an existing color and determines if a constrast color should be black or white 
        //The below algorithm comes from the w3c standard for accessibility 
        //First, we convert the rgb value for each color into its contrast value
        const contrasts = [color.red, color.green, color.blue].map(currentColor => {
            let currentContrast = currentColor / 255.0;
            if (currentContrast <= 0.03928) {
                currentContrast = currentContrast / 12.92;
            }
            else {
                currentContrast = Math.pow(((currentContrast + 0.055) / 1.055), 2.4);
            }
            return currentContrast;
        });
        //now we use that contrast to calculate an overall luminosity:
        const luminosity = 0.2126 * contrasts[0] + 0.7152 * contrasts[1] + 0.0722 * contrasts[2];
        if (luminosity > 0.179) {
            //if the luminosity is bright, use black as contrast
            return {
                red: 0,
                green: 0,
                blue: 0,
                transparency: 1
            };
        }
        else { //otherwise, use white as a contrast
            return {
                red: 255,
                green: 255,
                blue: 255,
                transparency: 1
            };
        }
    }

    determineGameColor(color) {
        //determine the effective color in the game 
        //RIGHT NOW this is one of eight possibilities and it's determined by the expressed phenotype
        //FUTURE IDEA: primary is the color they actually are; secondary is a color based on genes
        let colorString = [{ code: 'r', value: color.red }, { code: 'g', value: color.green }, { code: 'b', value: color.blue }].map(
            (obj) => (obj.value === 255 ? obj.code : ""));
        colorString = colorString.join('');

        let result;
        switch (colorString) {
            case 'r': result = { primary: "red", secondary: "red" };
                break;
            case 'g': result = { primary: "green", secondary: "green" };
                break;
            case 'b': result = { primary: "blue", secondary: "blue" };
                break;
            case 'rg': result = { primary: "green", secondary: "red" };
                break;
            case 'gb': result = { primary: "blue", secondary: "green" };
                break;
            case 'rb': result = { primary: "red", secondary: "blue" };
                break;
            case 'rgb': result = { primary: "white", secondary: "white" };
                break;
            case '': result = { primary: "black", secondary: "black" };
                break;
            default: break;
        }
        return result;
    }

    determineDominance(gene) {
        const firstAllele = gene[0];
        const secondAllele = gene[1];
        //If one is dominant but not the other, return that
        if (firstAllele.isDominant && !secondAllele.isDominant) {
            return firstAllele;
        }
        if (!firstAllele.isDominant && secondAllele.isDominant) {
            return secondAllele;
        }
        //(TO-DO) additional special case: codominance!
        //(TO-DO) figure out how to work this (eventually)

        //otherwise, recessives are returned at random
        return this.getRandomAllele(gene);
    }

    getRandomAllele(gene) {
        const whichGene = Math.floor(Math.random() * Math.floor(2));
        return (whichGene ? gene[0] : gene[1]);
    }

}

module.exports = Pet; 
