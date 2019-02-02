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

    determineColor(geneGroup) {
        //EXPECTS the name of a key (on the dna object) which takes
        const evaluatedColor = {
            red: 0,
            green: 0,
            blue: 0,
            transparency: 1
        };

        //rgba colors have genes for red, green, and blue; transparency is 1 (for now)
        ["red", "green", "blue"].forEach(color => {
            //Grab the gene sequence for the current color (red, green, or blue)
            let currentColor = this.dna[geneGroup][color];
            //There are gene pairs for each possible bit - we will check what is dominant 
            [1, 2, 4, 8, 16, 32, 64, 128].forEach(bit => {
                let winningGene = this.determineDominance(currentColor[bit]);
                evaluatedColor[color] += (winningGene.value ? bit : 0);
            });
        });

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

    determineGameColor(rgbColor) {
        //(TO-DO) Math this out for game balance to understand the projected distribution of game colors
        //RETHINK THIS:
        //Maybe you get 'points' toward each of the possible game colors, based on different checks you pass (or fail)
        //At the end, return the two with the most 'points'
        //If only one category gets 'votes'?  that becomes both primary and secondary?
        const { red, green, blue } = rgbColor;

        //First, we attack the low hanging fruit -- 'pure' colors
        //If all RGB are 32 or under?  BLACK/BLACK
        if (red <= 32 && green <= 32 && blue <= 32) {
            return {
                primary: "black",
                secondary: "black"
            }
        }

        //similarly, if all RGB are 223-255?  WHITE/WHITE
        if (red >= 223 && green >= 223 && blue >= 223) {
            return {
                primary: "white",
                secondary: "white"
            }
        }

        //Others are: highest color is 223 or higher; others are 64 or less
        if (red >= 223 && green <= 64 && blue <= 64) {
            return {
                primary: "red",
                secondary: "red"
            }
        }

        if (red <= 64 && green >= 223 && blue <= 64) {
            return {
                primary: "green",
                secondary: "green"
            }
        }

        if (red <= 64 && green >= 223 && blue <= 64) {
            return {
                primary: "blue",
                secondary: "blue"
            }
        }

        //Next, check for grayscale range - all values within 32 of each other
        if (Math.abs(red - green) <= 32 && Math.abs(red - blue) <= 32 && Math.abs(blue - green) <= 32) {
            //quick check for the order of the black and white 
            //This math will put us on the more white end of the spectrum, so white goes first
            if ((red + green + blue) - 96 >= 480) {
                return {
                    primary: "white",
                    secondary: "black"
                }
            }
            else {
                return {
                    primary: "black",
                    secondary: "white"
                }
            }
        }

        //Everything else depends on which color is highest -- the secondary is either the next highest color, or a grayscale value (if the two other colors are close)
        const result = {
            primary: "",
            secondary: ""
        }

        //First, find the value that is closest to 255 - that will be our primary
        const sortedColors = [
            { name: "red", value: red },
            { name: "green", value: green },
            { name: "blue", value: blue }]
            .sort((a, b) => b.value - a.value);

        //The first item in our sorted colors array will automatically be the primary color
        result.primary = sortedColors[0].name;

        //Next, check if the other two values are within 32 of each other - in that case, secondary will actually be either white or black
        if (Math.abs(sortedColors[1].value - sortedColors[2].value) <= 32) {
            //If the sorted colors are on the 128 side, use white as the secondary
            if (sortedColors[1].value + sortedColors[2].value >= 224) {
                result.secondary = "white";
            }
            else {
                result.secondary = "black";
            }
        }
        else { //otherwise, the secondary color is just the next highest color by value
            result.secondary = sortedColors[1].name;
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

