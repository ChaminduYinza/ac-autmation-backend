const joi = require('joi');
const placeConfig = require('../../config/acConfig');

// new ac registration Schema and validations to be done
module.exports.newAC = joi.object().keys({
    did: joi
        .string()
        .required(),
    roomTemperature: joi
        .number(),
    age: joi
        .number(),
    comfortableTemperature: joi
        .number(),
    power: joi
        .boolean()

});

// update ac Schema and validations to be done
module.exports.updateAC = joi.object().keys({
    did: joi
        .string()
        .required(),
    roomTemperature: joi
        .number(),
    age: joi
        .number(),
    comfortableTemperature: joi
        .number(),
    power: joi
        .boolean(),
    noOfPersons: joi
        .number(),
});

//did Schema and validations to be done
module.exports.did = joi.object().keys({
    did: joi
        .string()
        .required(),
});