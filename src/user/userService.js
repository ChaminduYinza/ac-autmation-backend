const userModel = require('./userModel');
const commonConfig = require('../../config/commonConfig');
const { OAuth2Client } = require('google-auth-library');
const config = require('../../config/commonConfig');
const client = new OAuth2Client(config.googleClientID);

/**
 * create new user
 * @param {*} body 
 */
module.exports.createUser = (body) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({
            email: (body.email).toLowerCase(),
            status: commonConfig.activeStatus
        }, function (error, userData) {
            if (error) {
                reject(error);
            }
            else if (userData == undefined || userData == null) {
                const user = new userModel();
                user.email = body.email;
                user.status = commonConfig.activeStatus;
                user.role = body.role;
                user.first_name = body.first_name;
                user.last_name = body.last_name;
                user.contact = body.contact;
                user.street_address = body.street_address;
                user.address_line2 = body.address_line2;
                user.city = body.city;
                user.images = body.images;
                user.setPassword(body.password);
                user.save((error, user) => {
                    (error) ? reject(error) : resolve(user);
                })
            } else {
                reject({ message: "User already exists", data: userData });
            }
        })
    })
}

/**
 * login user 
 * @param {*} usser 
 */
module.exports.loginUser = (user) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({
            email: user.email.toLowerCase(),
            status: commonConfig.activeStatus
        }, function (error, userData) {
            if (error) {
                reject(error);
            }
            if (userData != undefined || userData != null) {
                let status = userData
                    .validPassword(user.password);
                (status) ?
                    resolve("Login success") :
                    reject("Invalid user name or password");
            } else {
                reject("Invalid user name or password");
            }
        })
    })
}

/**
 * get user details by userID
 */
module.exports.getUserByID = (userID) => {
    return new Promise((resolve, reject) => {
        userModel.findById(
            userID,
            { salt: 0, password: 0 },
            (error, data) => {
                if (error)
                    reject(error)
                else if (data == null || data == undefined)
                    reject("No user found")
                else
                    resolve(data)
            })
    })
}

/**
 * update user details by userID
 */
module.exports.updateUserData = (userID, user) => {
    return new Promise((resolve, reject) => {
        userModel.findByIdAndUpdate(
            userID,
            user,
            { new: true, safe: true },
            (error, data) => {
                if (error)
                    reject(error)
                else if (data == null || data == undefined)
                    reject("No user found")
                else
                    resolve("User data updated.")
            })
    })
}

/**
 * remove created user
 */
module.exports.removeCreatedUser = (userID) => {
    return new Promise((resolve, reject) => {
        userModel.findByIdAndUpdate(
            userID,
            {
                status: commonConfig.deactivateStatus,
                delete_date: new Date()
            },
            { new: true, safe: true },
            (error, data) => {
                if (error)
                    reject(error)
                else if (data == null || data == undefined)
                    reject("No user found")
                else
                    resolve("User removed successfully.")
            })
    })
}

/**
 * find users by condition
 */
module.exports.findUsersByCondition = (condition) => {
    return new Promise((resolve, reject) => {
        userModel.find(
            condition,
            { salt: 0, password: 0 },
            (error, data) => {
                if (error)
                    reject(error)
                else if (data == null || data == undefined || data.length == 0)
                    reject("No user found")
                else
                    resolve(data)
            })
    })
}

/**
 * sign in with google
 */
module.exports.googleAuth = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: config.googleClientID,
            });
            console.log(ticket)
            const payload = ticket.getPayload();
            try {
                let user = await this.createUser({
                    role: config.Client,
                    email: payload.email.toLowerCase(),
                    first_name: payload.name,
                    images: payload.picture
                })
                resolve(user);
            } catch (error) {
                console.log(error);
                if (error.message == "User already exists")
                    resolve(error.data);
                else
                    reject(error);
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}