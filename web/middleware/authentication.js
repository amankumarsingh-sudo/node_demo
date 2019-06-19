var jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;
const expiresIn = process.env.JWT_EXPIRES;
const HAPI_AUTH_JWT = require('hapi-auth-jwt2');
const userDB = require('../../models/user')
var AUTH = module.exports = {};

let createToken = (data) => {
    return jwt.sign({
        data: data
    }, secretKey, { expiresIn: expiresIn });
}

/**
 * Method to validate the slaves' JWT
 * @param {*} decoded - decoded token
 * @param {*} cb - callback
 */

const ValidateJWT = (decoded, req, cb) => {
    validateAccessCode(decoded._id, decoded.sub, decoded.accessCode, req, (allow) => {
        let isValid = (decoded.key == 'acc' && allow) ? true : false;
        return cb(null, isValid);
    });
};

const validateUser = async (userId) => {
    let user = await userDB.fetchUserDetails(userId)
    if (user == '' || user == null) {
        return false
    } else if (user.type == 2) {
        return false
    } else {
        return true
    }
}

const validateAdminUser = async (userId) => {
    let user = await userDB.fetchUserDetails(userId)
    if (user == '' || user == null) {
        return false
    } else if (user.type == 1) {
        return false
    } else {
        return true
    }
}

const validate = async function (decoded, request) {
    // do your checks to see if the person is valid
    if (!await validateUser(decoded.data._id)) {
        return { isValid: false };
    }
    else {
        return { isValid: true };
    }
};

const validateAdmin = async function (decoded, request) {

    // do your checks to see if the person is valid
    if (!await validateAdminUser(decoded.data._id)) {
        return { isValid: false };
    }
    else {
        return { isValid: true };
    }
};


let userJwt =
{
    key: secretKey,
    validate: validate,
    verifyOptions: { algorithms: ['HS256'] }
}

let adminJwt =
{
    key: secretKey,
    validate: validateAdmin,
    verifyOptions: { algorithms: ['HS256'] }
}


module.exports = {
    createToken, userJwt, HAPI_AUTH_JWT , adminJwt
}
