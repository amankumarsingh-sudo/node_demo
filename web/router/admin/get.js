const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi);
const users = require('../../../models/user')
const authentication = require('../../middleware/authentication')


let paramsValidator = {
    index: Joi.number().required().default(0).description('please enter index').label("index is required"),
    limit: Joi.number().min(1).required().default(10).description('please enter limit to be fatch').label("limit is required")
}
/**
 * @function handlers
 * @param {*} request 
 * @param {*} h 
 */
let handlers = async (request, h) => {
    try {
        let responseData = await users.fetchAccounts(request.params)

        return h.response({
            message: 'successfully fetch',
            data: responseData
        }).code(200)
    } catch (err) {
        console.log(err)
        return h.response({
            message: err.message,
        }).code(500)
    }
}

module.exports = {
    paramsValidator,
    handlers
}