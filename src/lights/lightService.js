const lightModel = require('./lightModel');

/**
 * save ac
 * @param {*} status
 */
module.exports.save = (acObj) => {
    return new Promise((resolve, reject) => {
        let light = new lightModel();
        light.did = acObj.did;
        light.save((error, data) => {
            error ? reject(error) : resolve(data);
        })
    })
};

/**
 * find ac by id and update
 */
module.exports.updateOne = (did, light) => {
    return new Promise((resolve, reject) => {
        lightModel.findOneAndUpdate(
            { did: did },
            light,
            { new: true, safe: true },
            (error, light) => {
                if (error) {
                    reject(error);
                } else if (light == null || light == undefined) {
                    reject("Invalid light ID");
                } else {
                    resolve(light);
                }
            });
    })
}

/**
 * find ac by id and return
 */
module.exports.findOne = (did) => {
    return new Promise((resolve, reject) => {
        lightModel.findOne(
            { did: did },
            (error, light) => {
                if (error) {
                    reject(error);
                } else if (light == null || light == undefined) {
                    reject("Invalid light id");
                } else {
                    resolve(light);
                }
            });
    })
}

/**
 * find ac by condition
 */
module.exports.find = (condition) => {
    return new Promise((resolve, reject) => {
        lightModel.find(
            condition,
            (error, light) => {
                if (error) {
                    reject(error);
                } else if (light == null || light == undefined) {
                    reject("Invalid light ID");
                } else {
                    resolve(light);
                }
            });
    })
}