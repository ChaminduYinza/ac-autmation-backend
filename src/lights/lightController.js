const lightService = require('./lightService');
const commonConfig = require('../../config/commonConfig');
const response = require('../../services/responseService');

/**
 * get light from the status
 * @param {*} req
 * @param {*} res
 */
module.exports.getLight = async (req, res) => {
    try {
        let light = await lightService.find(
            req.body.status ? req.body : { status: { $ne: commonConfig.deactivateStatus } });
        response.successWithData(light, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};

/**
 * update light
 * @param {*} req
 * @param {*} res
 */
module.exports.updateLight = async (req, res) => {
    try {
        let acObject = JSON.parse(JSON.stringify(req.body));
        delete acObject.did;
        let light = await lightService.updateOne(req.body.did, acObject);
        response.successWithData(light, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};

/**
 * delete light
 * @param {*} req
 * @param {*} res
 */
module.exports.deleteLight = async (req, res) => {
    try {
        let light = await lightService.delete(
            req.body.did,
            {
                delete_date: new Date(),
                status: commonConfig.deactivateStatus
            });
        response.successWithData(light, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};

/**
 * find ac by id
 * @param {*} req
 * @param {*} res
 */
module.exports.findLightByID = async (req, res) => {
    try {
        let light = await lightService.findOne(req.body.did);
        response.successWithData(light, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};

/**
 * Create new light
 * @param {*} req
 * @param {*} res
 */
module.exports.createNewLight = async (req, res) => {
    try {
        let light = await lightService.save(req.body);
        response.successWithData(light, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};