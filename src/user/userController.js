const userService = require('./userService');
const response = require('../../services/responseService');
const commonConfig = require('../../config/commonConfig');

/**
 * add new user to the system
 * @param {*} req
 * @param {*} res
 */
module.exports.newUser = async (req, res) => {
    try {
        let user = await userService.createUser(req.body);
        response.successWithData(user, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};

/**
 * user login to the system
 * @param {*} req
 * @param {*} res
 */
module.exports.login = async (req, res) => {
    try {
        let user = await userService.loginUser(req.body);
        response.successTokenWithData(user, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};

/**
 * update user details
 * @param {*} req
 * @param {*} res
 */
module.exports.updateUser = async (req, res) => {
    try {
        let data = JSON.parse(JSON.stringify(req.body));
        delete data.userId;
        let user = await userService.updateUserData(req.body.userId, data);
        response.successWithData(user, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};

/**
 * delete user
 * @param {*} req
 * @param {*} res
 */
module.exports.deleteUser = async (req, res) => {
    try {
        let data = await userService.removeCreatedUser(req.body.userId);
        response.successWithData(data, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};

/**
 * get all active user
 * @param {*} req
 * @param {*} res
 */
module.exports.getAllActiveUsers = async (req, res) => {
    try {
        let data = await userService
            .findUsersByCondition({ status: commonConfig.activeStatus });
        response.successWithData(data, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};

/**
 * get user by userId
 * @param {*} req
 * @param {*} res
 */
module.exports.getUserByID = async (req, res) => {
    try {
        let data = await userService.getUserByID(req.body.userId);
        response.successWithData(data, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};

/**
 * Login or register user by google
 * @param {*} req
 * @param {*} res
 */
module.exports.googleAuth = async (req, res) => {
    try {
        let data = await userService.googleAuth(req.body.token);
        response.successTokenWithData(data, res);
    } catch (error) {
        response.customError('' + error, res);
    }
};