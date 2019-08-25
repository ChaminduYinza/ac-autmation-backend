const acModel = require('./acModel');
const acConfig = require('../../config/acConfig');
const _ = require('lodash');
/**
 * save ac
 * @param {*} status
 */
module.exports.save = (acObj) => {
    return new Promise((resolve, reject) => {
        let ac = new acModel();
        ac.did = acObj.did;
        ac.save((error, data) => {
            error ? reject(error) : resolve(data);
        })
    })
};

/**
 * find ac by id and update
 */
module.exports.updateOne = (did, ac) => {
    return new Promise((resolve, reject) => {
        acModel.findOne(
            { did: did },
            (error, acResult) => {
                if (error) {
                    reject(error);
                } else if (acResult == null || acResult == undefined) {
                    reject("Invalid ac id");
                } else {
                    if ((ac.roomTemperature && acResult.roomTemperatureHistory.length === 0) || ac.roomTemperature && acResult.roomTemperatureHistory.length > 0 && acResult.roomTemperatureHistory[acResult.roomTemperatureHistory.length - 1] !== ac.roomTemperature) {
                        acResult.roomTemperatureHistory.push(ac.roomTemperature);
                        ac.roomTemperatureHistory = acResult.roomTemperatureHistory;
                    }
                    acModel.findOneAndUpdate(
                        { did: did },
                        ac,
                        { new: true, safe: true },
                        (error, updatedAC) => {
                            if (error) {
                                reject(error);
                            } else if (updatedAC == null || updatedAC == undefined) {
                                reject("Invalid ac ID");
                            } else {
                                if (updatedAC.age && (updatedAC.comfortableTemperature === 0 || !updatedAC.comfortableTemperature)) {
                                    updatedAC.comfortableTemperature = (_.find(acConfig.ageMapping,
                                        { ageGroup: Math.ceil((updatedAC.age + 1) / 10) * 10 }).temperature)
                                }
                                if (updatedAC.comfortableTemperature - (updatedAC.noOfPersons ? updatedAC.noOfPersons : 0) > acConfig.minValue) {
                                    updatedAC.comfortableTemperature = updatedAC.comfortableTemperature - (updatedAC.noOfPersons ? updatedAC.noOfPersons : 0)
                                } else {
                                    updatedAC.comfortableTemperature = acConfig.minValue;
                                }
                                resolve(updatedAC);
                            }
                        });
                }
            });
    })
}

/**
 * find ac by id and return
 */
module.exports.findOne = (did) => {
    return new Promise((resolve, reject) => {
        acModel.findOne(
            { did: did },
            (error, ac) => {
                if (error) {
                    reject(error);
                } else if (ac == null || ac == undefined) {
                    reject("Invalid ac id");
                } else {
                    resolve(ac);
                }
            });
    })
}

/**
 * find ac by condition
 */
module.exports.find = (condition) => {
    return new Promise((resolve, reject) => {
        acModel.find(
            condition,
            (error, ac) => {
                if (error) {
                    reject(error);
                } else if (ac == null || ac == undefined) {
                    reject("Invalid ac ID");
                } else {
                    resolve(ac);
                }
            });
    })
}