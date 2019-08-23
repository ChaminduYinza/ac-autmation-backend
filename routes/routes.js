'use strict';
// Import Express
const express = require('express');
// user router
const router = express.Router();
// Import body parser
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.json());

// import  controllers
const acController = require('../src/ac-devices/acController');
const lightController = require('../src/lights/lightController');


// import validator Schemas
const acSchema = require('../src/ac-devices/acSchema');
const lightSchema = require('../src/lights/lightSchema');

// import Validator class
const validator = require('../services/validator');

//ac routes
router.route('/api/ac') // get all ac details
    .get(acController.getAC);
    router.route('/api/ac/new') // add ac details by did
    .post(validator.validateBody(acSchema.newAC), acController.createNewAc);
router.route('/api/ac/find-one') // add ac details
    .post(validator.validateBody(acSchema.did), acController.findACByID);
router.route('/api/ac') // update ac details
    .post(validator.validateBody(acSchema.updateAC), acController.updateAC);


//ac routes
router.route('/api/light') // get all light details
.get(lightController.getLight);
router.route('/api/ac/find-one') // add ac details
    .post(validator.validateBody(acSchema.did), lightController.findLightByID);
router.route('/api/light/new') // add light details
.post(validator.validateBody(lightSchema.newLight), lightController.createNewLight);
router.route('/api/light') // update light details
.post(validator.validateBody(lightSchema.updateLight), lightController.updateLight);


module.exports = router;