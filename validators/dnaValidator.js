const Joi = require('joi');

//This is the definition for what goes in our genes
const simpleColorGene = Joi.array().min(2).max(2).items(
    Joi.object()
        .keys(
            {
                value: Joi.number().integer().min(0).max(1),
                isDominant: Joi.boolean()
            }));

const dnaSchema = Joi.object().keys({
    baseColorRed: simpleColorGene,
    baseColorGreen: simpleColorGene,
    baseColorBlue: simpleColorGene
});
 

module.exports = {
    isValidDNA: function(dnaToTest) {
         return Joi.validate(dnaToTest, dnaSchema, function (err, value) {
            if(!err) {
                return true;
            }
            return false;
        }); 
    }
};