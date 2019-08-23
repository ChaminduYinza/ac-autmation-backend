const joi = require('joi');
const placeConfig = require('../../config/acConfig');

// new ac registration Schema and validations to be done
module.exports.newLight = joi.object().keys({
    did: joi
        .string()
        .required(),
    power: joi
        .boolean()

});

// update ac Schema and validations to be done
module.exports.updateLight = joi.object().keys({
    did: joi
        .string()
        .required(),
    power: joi
        .boolean()
});