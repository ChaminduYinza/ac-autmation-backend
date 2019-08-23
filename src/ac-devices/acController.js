const acService = require('./acService');
const commonConfig = require('../../config/commonConfig');
const response = require('../../services/responseService');

/**
 * get acs from the status
 * @param {*} req
 * @param {*} res
 */
module.exports.getAC = async (req, res) => {
    try {
        let acs = await acService.find(
            req.body.status ? req.body : { status: { $ne: commonConfig.deactivateStatus } });
        response.successWithData(acs, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};

/**
 * update acs
 * @param {*} req
 * @param {*} res
 */
module.exports.updateAC = async (req, res) => {
    try {
        let acObject = JSON.parse(JSON.stringify(req.body));
        delete acObject.did;
        let ac = await acService.updateOne(req.body.did, acObject);
        response.successWithData(ac, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};

/**
 * delete acs
 * @param {*} req
 * @param {*} res
 */
module.exports.deleteAC = async (req, res) => {
    try {
        let ac = await acService.delete(
            req.body.did,
            {
                delete_date: new Date(),
                status: commonConfig.deactivateStatus
            });
        response.successWithData(ac, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};

/**
 * find ac by id
 * @param {*} req
 * @param {*} res
 */
module.exports.findACByID = async (req, res) => {
    try {
        let ac = await acService.findOne(req.body.did);
        response.successWithData(ac, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};

/**
 * Create new ac
 * @param {*} req
 * @param {*} res
 */
module.exports.createNewAc = async (req, res) => {
    try {
        let ac = await acService.save(req.body);
        response.successWithData(ac, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};