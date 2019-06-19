let Joi = require('joi')
const bcrypt = require('bcrypt');
const users = require('../../../models/user')
const authentication = require('../../middleware/authentication')


let payload = {
    email: Joi.string().required().email({
        minDomainAtoms: 2
    }).description('please enter your valid email address').label('email is required'),
    password: Joi.string().required().description('please enter password').label("password is required"),
}
/**
 * @function handlers
 * @param {*} request 
 * @param {*} h 
 */
let handlers = async (request, h) => {

    let userData = await users.validateUser(request.payload)

    if (!userData) // validate user
        return h.response({
            message: 'invald user.'
        }).code(401)

    let match = await bcrypt.compare(request.payload.password, userData.password);

    if (!match) //validate password
        return h.response({
            message: 'password is wrong please try again.'
        }).code(402)

    let response = {
        token: await authentication.createToken({ "username": userData.username, _id: userData._id, email: userData.email }),
        name: userData.username,
        email: userData.email,
        phone: userData.phone,
        balance: userData.balance
    }

    return h.response({
        message: 'Successfully loggedIn.',
        data: response
    }).code(200)
}

module.exports = {
    payload,
    handlers
}