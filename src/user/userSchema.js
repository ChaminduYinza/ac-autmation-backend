// import validator class
const joi = require('joi');

// user login Schema and validations to be done
module.exports.login = joi.object().keys({
    email: joi
        .string()
        .email()
        .required(),
    password: joi.required(),
});

// user token Schema and validations to be done
module.exports.token = joi.object().keys({
    token: joi.string().required()
});

// user registration Schema and validations to be done
module.exports.newUser = joi.object().keys({
    email: joi
        .string()
        .email()
        .required(),
    password: joi.string()
        .min(6)
        .required(),
    role: joi
        .string()
        .min(1)
        .max(30)
        .required(),
    first_name: joi
        .string()
        .trim()
        .alphanum()
        .min(1),
    last_name: joi
        .string()
        .trim()
        .alphanum()
        .min(1),
    contact: joi
        .string()
        .regex(/^[+]?[(]?[0-9]{3}[)]?[-s. ]?[0-9]{3}[-s.]?[0-9]{4,6}$/)
        .max(15),
    street_address: joi
        .string()
        .min(1),
    address_line2: joi.allow(),
    city: joi
        .string()
        .min(1),
    images: joi.string(),
})

// user update Schema and validations to be done
module.exports.updateUser = joi.object().keys({
    userId: joi
        .string()
        .alphanum()
        .min(24)
        .max(24)
        .required(),
    email: joi
        .string()
        .email(),
    role: joi
        .string()
        .min(1)
        .max(30),
    first_name: joi
        .string()
        .trim()
        .alphanum()
        .min(1),
    last_name: joi
        .string()
        .trim()
        .alphanum()
        .min(1),
    contact: joi
        .string()
        .regex(/^[+]?[(]?[0-9]{3}[)]?[-s. ]?[0-9]{3}[-s.]?[0-9]{4,6}$/)
        .max(15),
    street_address: joi
        .string()
        .min(1),
    address_line2: joi.allow(),
    city: joi
        .string()
        .min(1),
    images: joi.string(),
})

//userId schema 
module.exports.userId = joi.object().keys({
    userId: joi
        .string()
        .alphanum()
        .min(24)
        .max(24)
        .required(),
})