let Joi = require('joi')
const Extension = require('joi-date-extensions');
const bcrypt = require('bcrypt');
const users = require('../../../models/user')
Joi = Joi.extend(Extension);
const rounds = process.env.ROUNDS


let payload = {
    username: Joi.string().required().description('please enter username').label("username is required"),
    phone: Joi.string().required().description('please enter mobile number').label('phone number is required'),
    email: Joi.string().required().email({
        minDomainAtoms: 2
    }).description('please enter your valid email address').label('email is required'),
    password: Joi.string().required().description('please enter password').label("password is required")
}

let handlers = async (request, h) => {

    let res = await users.checkUsers(request.payload)

    if (res > 0)
        return h.response({
            message: 'This user is already exist please try with some other creds.'
        }).code(402)

    request.payload.password = bcrypt.hashSync(request.payload.password, parseInt(rounds));

    await users.signup(request.payload)

    return h.response({
        message: 'Successfully created.'
    }).code(200)
}

module.exports = {
    payload,
    handlers
}